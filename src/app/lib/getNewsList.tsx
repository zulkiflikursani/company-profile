interface Post {
  id: number;
  title: string;
  content: string;
  tgl_berita: string;
  thumbnailUrl: string;
}

interface ApiResponse {
  success: boolean;
  data?: Post[]; // Data akan ada jika success true
  message?: string; // Pesan error jika success false
}

export async function getNewsList(): Promise<ApiResponse> {
  try {
    const response = await fetch("http://localhost:3000/api/allnews?page=1", {
      method: "GET", // Mengubah metode menjadi GET
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    console.log("list berita", data.data);
    return data;
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message || "Network error",
    };
  }
}

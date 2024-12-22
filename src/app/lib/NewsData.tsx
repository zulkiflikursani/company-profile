interface Post {
  id: number;
  title: string;
  content: string;
}

interface ApiResponse {
  success: boolean;
  data?: Post; // Data akan ada jika success true
  message?: string; // Pesan error jika success false
}

export async function getData(postId: number): Promise<ApiResponse> {
  try {
    let baseUrl = "";
    if (typeof window !== "undefined") {
      baseUrl = window.location.origin;
    } else {
      baseUrl =
        process.env.NEXT_PUBLIC_URL ||
        process.env.VERCEL_URL ||
        "http://localhost:3000";
    }
    const apiUrl = `${baseUrl}/api/detail?id=${postId}`;
    const response = await fetch(apiUrl);
    if (!response.ok) {
      const errorResponse = await response.json();
      console.error("Error fetch post:", errorResponse);
      return errorResponse;
    }
    const data = await response.json();
    return data;
  } catch (error: unknown) {
    console.error("Failed to fetch post:", error);
    return {
      success: false,
      message: (error as Error).message || "Network error",
    };
  }
}

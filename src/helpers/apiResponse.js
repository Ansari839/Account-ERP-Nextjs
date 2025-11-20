// Helper function to create standardized API responses
export const createApiResponse = (data, statusCode = 200) => {
  return new Response(JSON.stringify(data), {
    status: statusCode,
    headers: { 
      'Content-Type': 'application/json' 
    },
  });
};

// Helper function to handle errors
export const createApiError = (message, statusCode = 500) => {
  return new Response(JSON.stringify({ message }), {
    status: statusCode,
    headers: { 
      'Content-Type': 'application/json' 
    },
  });
};
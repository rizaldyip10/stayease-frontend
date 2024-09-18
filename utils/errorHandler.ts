export const handleError = (error: any): void => {
  console.error(`Error: ${error}`);

  if (error.response) {
    console.error(`Response data: ${error.response.data}`);
    console.error(`Response status: ${error.response.status}`);
    console.error(`Response headers: ${error.response.headers}`);
  } else if (error.request) {
    console.error(`No response received: ${error.request}`);
  } else {
    console.error(`Error message: ${error.message}`);
  }
};

class ApiHelper {
  static async get(url, headers = {}, retries = 3, timeout = 10000) {
    return await ApiHelper.request(url, 'GET', null, headers, retries, timeout);
  }

  static async post(url, body, headers = {}, retries = 3, timeout = 10000) {
    return await ApiHelper.request(url, 'POST', body, headers, retries, timeout);
  }

  static async put(url, body, headers = {}, retries = 3, timeout = 10000) {
    return await ApiHelper.request(url, 'PUT', body, headers, retries, timeout);
  }

  static async delete(url, headers = {}, retries = 3, timeout = 10000) {
    return await ApiHelper.request(url, 'DELETE', null, headers, retries, timeout);
  }

  static async request(url, method, body = null, headers = {}, retries = 3, timeout = 10000) {
    const options = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    for (let i = 0; i < retries; i++) {
      try {
        // Set up the timeout and abort controller
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);
        options.signal = controller.signal;

        const response = await fetch(url, options);

        // Clear the timeout if the request completes
        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
      } catch (error) {
        if (error.name === 'AbortError') {
          // console.log(`Request to ${url} timed out after ${timeout}ms`);
        } else {
          console.log(`Attempt ${i + 1} failed for ${url}:`, error.message);
        }

        // If the maximum number of retries is reached, throw the error
        if (i === retries - 1) {
          throw error;
        }
      }
    }
  }
}

export default ApiHelper;

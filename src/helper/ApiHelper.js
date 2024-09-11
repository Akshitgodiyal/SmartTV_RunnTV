class ApiHelper {
  static async get(url, headers = {}) {
    return await ApiHelper.request(url, 'GET', null, headers);
  }

  static async post(url, body, headers = {}) {
    return await ApiHelper.request(url, 'POST', body, headers);
  }

  static async put(url, body, headers = {}) {
    return await ApiHelper.request(url, 'PUT', body, headers);
  }

  static async delete(url, headers = {}) {
    return await ApiHelper.request(url, 'DELETE', null, headers);
  }

  static async request(url, method, body = null, headers = {}) {
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

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("HTTP error! status: " + response.status);

      }
      return await response.json();
    } catch (error) {
      console.error('API call error:', error);
      throw error;
    }
  }
}

export default ApiHelper;
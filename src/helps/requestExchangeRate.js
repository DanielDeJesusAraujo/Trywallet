async function requestExchangeRate() {
  try {
    const URL = 'https://economia.awesomeapi.com.br/json/all';
    const resouver = await fetch(URL);
    const data = await resouver.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

export default requestExchangeRate;

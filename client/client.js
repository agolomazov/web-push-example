const publicKey =
  'BJ_L5VKq_DaHzIe3Lbyn8GgVudG2KJO9JFbm1LavA-eTdyA_i2-rk3omQ1QbCOOczI0gLZR5wLq5PHdmrkT5ghg';

// Проверка работоспособности SW
if ('serviceWorker' in navigator) {
  send().catch(err => console.error(err));
  // notifyMe();
}

// Регистратор SW, PUSH, отправка Push
async function send() {
  console.log('Registering sw...');
  const register = await navigator.serviceWorker.register('./worker.js', {
    scope: '/',
  });

  console.log('Регистрация SW завершена успешно!');

  // Регистрация PUSH
  console.log('Регистрация Push...');
  // @url https://developer.mozilla.org/ru/docs/Web/API/PushManager/subscribe
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUintArray(publicKey),
  });
  console.log('Регистрация Push завершена...');

  // Отправка сообщения
  console.log('Отправка сообщения на сервер');
  await fetch('/subscribe', {
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  console.log('Сообщение успешно отправлено');
}


function urlBase64ToUintArray(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
}

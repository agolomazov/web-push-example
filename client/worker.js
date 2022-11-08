console.log('SW загружен');

self.addEventListener('push', async (e) => {
  const data = e.data.json();
  console.log('Пуш сообщение отправлено', data);

  const options = {
    body: 'Сообщение из подсистемы Вопросы-Ответы',
    icon: 'https://irecommend.ru/sites/default/files/product-images/399872/W1RteMSzFlFTkVmZKTomg.png',
    image: 'https://netology.ru/dist/public/images/netology_b83461.png',
  };

  console.log(options);

  const notify = await self.registration.showNotification(data.title, options);
  console.log(notify);
});

self.addEventListener('notificationclick', (event) => {
  console.log('On notification click: ', event.notification.tag);

  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientsArr) => {
      // Otherwise, open a new tab to the applicable URL and focus it.
      clients.openWindow('https://google.com');
    })
  );
  
  event.notification.close();
});
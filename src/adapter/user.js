const userAdapter = (data) => ({
  id: data[`id`],
  email: data[`email`],
  name: data[`name`],
  avatarUrl: data[`avatar_url`],
});

export {userAdapter};

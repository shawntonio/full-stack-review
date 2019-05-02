insert into user_login (username, password)
values (
  ${username},
  ${hash}
) returning username, password;

insert into users (firstname, lastname, email)
values (
  ${firstname},
  ${lastname},
  ${email}
);

insert into balance (balance)
values (
  0
) returning balance_id;
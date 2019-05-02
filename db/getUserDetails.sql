select firstname, lastname, email, balance from users
join balance on users.user_id = balance.balance_id
where users.user_id = ${id};
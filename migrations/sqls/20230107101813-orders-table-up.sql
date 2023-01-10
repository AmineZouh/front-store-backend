/* Replace with your SQL commands */
create table orders(id serial primary key, user_id integer references users(id), date varchar(100), status varchar(100));

insert into orders(user_id, date, status) values(1, '01-06-2023', 'completed');
insert into orders(user_id, date, status) values(1, '23-05-2023', 'active');
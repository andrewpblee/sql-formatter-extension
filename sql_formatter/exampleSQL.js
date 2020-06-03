module.exports = `with a as
(select 
date,
user,
session 
from users
where date between '2020-01-01' and '2020-01-10' 
)

, b as 
(select
session, 
order
from orders 
)

select user, order from a left join b on a.session = b.session`;

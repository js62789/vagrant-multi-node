#puppet essential... 
group { 'puppet': ensure => 'present' }

#global path def.
Exec { path => '/usr/bin:/bin:/usr/sbin:/sbin' }

include apt
include vim
include nginx

nginx::config::cluster{'appservers':
  servers => [
    '192.168.10.21:80',
    '192.168.10.22:80',
  ]
}

nginx::config::vhost{
  'nodeapp':
    cluster => 'appservers',
}

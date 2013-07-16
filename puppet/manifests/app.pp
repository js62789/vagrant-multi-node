#puppet essential... 
group { 'puppet': ensure => 'present' }

#global path def.
Exec { path => '/usr/bin:/bin:/usr/sbin:/sbin' }

include apt
include vim
include nginx
include nodejs

nginx::config::cluster{'node_cluster':
  servers => [
    '127.0.0.1:3000',
  ]
}

nginx::config::vhost{
  'nodeapp':
    cluster => 'node_cluster',
}

nodejs::config::app{
  'nodeapp':
    env => 'development',
    app_dir => '/vagrant',
    app_file => 'server.js',
}
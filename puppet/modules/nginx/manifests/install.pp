class nginx::install {
  apt::ppa {
    'ppa:nginx/stable':
      before => Anchor['nginx::repo'];
  }

  # anchor resource provides a consistent dependency for prereq.
  anchor {
    'nginx::repo':
  }

  package {
    'nginx':
      ensure => present,
      require => Anchor['nginx::repo'];
  }

  # file { 
  #   '/var/www':
  #     ensure => link,
  #     target => "/vagrant",
  #     notify => Service['nginx'],
  #     force  => true;
  # }

  # file { 
  #   '/etc/nginx/sites-enabled/default':
  #     ensure => absent,
  #     require => Package['nginx'],
  #     notify => Service['nginx'];
  # }

  # file { 
  #   '/etc/nginx/fastcgi_params':
  #     ensure  => file,
  #     content => template('nginx/fastcgi_params.erb'),
  #     require => Package['nginx'],
  #     notify => Service['nginx'];
  # }

  # file { 
  #   '/etc/nginx/security':
  #     ensure  => file,
  #     content => template('nginx/security.erb'),
  #     require => Package['nginx'],
  #     notify => Service['nginx'];
  # }
}
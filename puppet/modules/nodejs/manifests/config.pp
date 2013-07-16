class nodejs::config {

  define app($env="development", $app_dir="/var/www", $app_file="server.js") {
    file {
      "/etc/init/${name}.conf":
        require => Class['nodejs::install'],
        notify => Service["${name}"],
        content => template('nodejs/nodejs.upstart.conf.erb'),
        mode => '0644',
        owner => 'root',
        group => 'root';
    }
    service {
      "${name}":
        ensure => running,
        hasstatus => true,
        hasrestart => true,
        enable => true,
        require => File["/etc/init/${name}.conf"];
    }
  }
}
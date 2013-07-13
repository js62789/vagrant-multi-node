# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|

  # The url from where the 'config.vm.box' box will be fetched if it
  # doesn't already exist on the user's system.
  # config.vm.box_url = "http://domain.com/path/to/above.box"

  # Share an additional folder to the guest VM. The first argument is
  # the path on the host to the actual folder. The second argument is
  # the path on the guest to mount the folder. And the optional third
  # argument is a set of non-required options.
  # config.vm.synced_folder "../data", "/vagrant_data"

  config.vm.define :lb do |lb_config|
    lb_config.vm :private_network, ip: "192.168.10.11"
    lb_config.vm.box = "precise64"
    lb_config.vm.host_name = "jk_lb_1"
    lb_config.vm.network :forwarded_port, guest: 80, host: 8080
    lb_config.ssh.timeout = 300
    lb_config.ssh.max_tries = 300
    lb_config.vm.provision :puppet do |puppet|
      puppet.manifests_path = "puppet/manifests"
      puppet.manifest_file = "lb.pp"
      puppet.module_path = "puppet/modules"
    end
  end

  config.vm.define :app1 do |app_config|
    app_config.vm :private_network, ip: "192.168.10.21"
    app_config.vm.box = "precise64"
    app_config.vm.host_name = "jk_app_1"
  # app_config.vm.network :forwarded_port, guest: 80, host: 8081
  # app_config.vm.network :forwarded_port, guest: 3000, host: 8091
    app_config.ssh.timeout = 300
    app_config.ssh.max_tries = 300
    app_config.vm.provision :puppet do |puppet|
      puppet.manifests_path = "puppet/manifests"
      puppet.manifest_file = "app.pp"
      puppet.module_path = "puppet/modules"
    end
  end

  config.vm.define :app2 do |app_config|
    app_config.vm :private_network, ip: "192.168.10.22"
    app_config.vm.box = "precise64"
    app_config.vm.host_name = "jk_app_2"
  # app_config.vm.network :forwarded_port, guest: 80, host: 8082
  # app_config.vm.network :forwarded_port, guest: 3000, host: 8092
    app_config.ssh.timeout = 300
    app_config.ssh.max_tries = 300
    app_config.vm.provision :puppet do |puppet|
      puppet.manifests_path = "puppet/manifests"
      puppet.manifest_file = "app.pp"
      puppet.module_path = "puppet/modules"
    end
  end

  #  config.vm.define :db do |db_config|
  #    db_config.vm :private_network, ip: "192.168.10.31"
  #    db_config.vm.box = "precise64"
  #    db_config.vm.host_name = "jk_db_1"
  #    db_config.ssh.timeout = 300
  #    db_config.ssh.max_tries = 300
  #    db_config.vm.provision :puppet do |puppet|
  #      puppet.manifests_path = "puppet/manifests"
  #      puppet.manifest_file = "db.pp"
  #      puppet.module_path = "puppet/modules"
  #    end
  #  end

end

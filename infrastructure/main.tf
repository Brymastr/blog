provider "digitalocean" {
  token = var.do_token
}

resource "digitalocean_ssh_key" "default" {
  name       = "Blog SSH Key"
  public_key = file("../env/id_ecdsa.pub")
}

data "digitalocean_image" "blog_base" {
  name = "blog-base.1"
}

resource "digitalocean_droplet" "blog_1" {
  image  = data.digitalocean_image.blog_base.id
  name   = "blog-1"
  region = "tor1"
  size   = "s-1vcpu-2gb"
  ssh_keys = [digitalocean_ssh_key.default.id]

}

resource "digitalocean_domain" "dorsay_dev" {
  name       = var.domain
  ip_address = digitalocean_droplet.blog_1.ipv4_address
}

resource "digitalocean_record" "cname" {
  domain = digitalocean_domain.dorsay_dev.name
  type   = "CNAME"
  name   = "*"
  value  = "@"
}

variable "domain" { }

variable "do_token" { }
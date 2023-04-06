
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'muvment/version'

Gem::Specification.new do |spec|
  spec.authors       = ['Julian Berbel Alt']
  spec.email         = ['julian@mumuki.org']

  spec.summary       = 'Muvment'
  spec.homepage      = 'https://github.com/mumuki/muvment'
  spec.license       = 'GPL-3.0'

  spec.files         = Dir['lib/**/*'] + Dir['app/**/*'] + ['Rakefile', 'README.md']
  spec.test_files    = `git ls-files -- {test,spec}/*`.split("\n")

  spec.name          = 'muvment'
  spec.require_paths = ['lib']
  spec.version       = Muvment::VERSION

  spec.add_development_dependency 'bundler', '>= 1.16', '< 3'
  spec.add_development_dependency 'rake', '~> 10.0'
  spec.add_development_dependency 'rspec', '~> 3.0'

  spec.required_ruby_version = '>= 2.3'
end

require_relative "boot"

require "rails/all"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module TodoApi
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.0
    config.api_only = true
    config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins '*'
        resource '*',
        :headers => :any,
        :methods => [:get, :post, :patch, :delete, :options]
      end
    end
  end
end

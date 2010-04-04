# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_gallery_session',
  :secret      => '9102049b4b146139612f0d1df543c5bd75fe98b55db8d0d88eebbcaf38807a49647b731b677acfc2c9a8fff872c0dffc0387d33cb1aa290391cd9ee581775ece'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store

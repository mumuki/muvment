require "spec_helper"

describe Muvment do
  it { expect(File.exist? Muvment.assets_path_for('javascripts/muvment.js')).to be true }
end

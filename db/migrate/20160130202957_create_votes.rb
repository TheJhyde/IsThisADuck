class CreateVotes < ActiveRecord::Migration
  def change
    create_table :votes do |t|
      t.integer :vote
      t.belongs_to :picture, index: true

      t.timestamps null: false
    end
  end
end

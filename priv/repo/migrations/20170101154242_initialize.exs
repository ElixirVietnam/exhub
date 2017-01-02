defmodule ExHub.Repo.Migrations.Initialize do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :username, :string
      add :email, :string
      add :image_url, :string

      timestamps()
    end

    create unique_index(:users, [:username])

    create table(:access_tokens, primary_key: false) do
      add :id, :uuid, primary_key: true
      add :refresh_token, :uuid
      add :expired_at, :utc_datetime
      add :refresh_token_expired_at, :utc_datetime
      add :is_valid, :boolean, default: true, null: false

      add :user_id, references(:users, on_delete: :nothing)

      timestamps()
    end

    create table(:tags) do
      add :name, :string

      timestamps()
    end

    create unique_index(:tags, [:name])

    create table(:categories) do
      add :name, :string
      add :index, :integer

      timestamps()
    end

    create unique_index(:categories, [:name])

    create table(:posts) do
      add :title, :string
      add :content, :string
      add :link, :string
      add :likes_count, :integer
      add :comments_count, :integer
      add :score, :float

      add :user_id, references(:users, on_delete: :nothing)
      add :category_id, references(:categories, on_delete: :nothing)

      timestamps()
    end

    create table(:posts_tags, primary_key: false) do
      add :post_id, references(:posts)
      add :tag_id, references(:tags)
    end

    create table(:comments) do
      add :content, :string
      add :likes_count, :integer

      add :user_id, references(:users, on_delete: :nothing)
      add :post_id, references(:posts, on_delete: :nothing)

      timestamps()
    end

    create table(:notifications) do
      add :content, :string
      add :type, :integer
      add :is_seen, :boolean
      add :link, :string

      add :user_id, references(:users, on_delete: :nothing)
      add :subject_id, references(:posts, on_delete: :nothing)

      timestamps()
    end

    create table(:notifications_actors, primary_key: false) do
      add :post_id, references(:posts, on_delete: :nothing)
      add :actor_id, references(:users, on_delete: :nothing)
    end
  end
end

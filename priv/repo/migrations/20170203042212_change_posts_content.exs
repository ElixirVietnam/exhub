defmodule ExHub.Repo.Migrations.ChangePostsContent do
  use Ecto.Migration

  def up do
    alter table(:posts) do
      modify :content, :text
      modify :title, :text
    end

    alter table(:comments) do
      modify :content, :text
    end
  end

  def down do
    alter table(:posts) do
      modify :content, :string
      modify :title, :string
    end

    alter table(:comments) do
      modify :content, :string
    end
  end
end

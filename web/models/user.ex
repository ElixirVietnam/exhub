defmodule ExHub.User do
  @moduledoc false

  use Ecto.Schema

  schema "users" do
    field :email
    field :username
    field :image_url

    timestamps()
  end

  def changeset(struct, params) do
    struct
    |> Ecto.Changeset.cast(params, [:username, :email, :image_url])
    |> Ecto.Changeset.unique_constraint(:username)
  end
end

defimpl ExHub.Can, for: ExHub.User do
  @moduledoc false

  def can?(%ExHub.User{} = subject, :owner, %ExHub.User{} = user) do
    user.id == subject.id
  end
end

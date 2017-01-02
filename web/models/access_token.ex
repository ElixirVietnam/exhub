defmodule ExHub.AccessToken do
  use Ecto.Schema
  import Ecto.Query

  @primary_key {:id, Ecto.UUID, autogenerate: true}
  schema "access_tokens" do
    field :is_valid, :boolean, default: true
    field :refresh_token, Ecto.UUID, autogenerate: true
    field :expired_at, Ecto.DateTime
    field :refresh_token_expired_at, Ecto.DateTime

    belongs_to :user, ExHub.User

    timestamps()
  end

  def user_changeset(%ExHub.User{} = user) do
    now = Ecto.DateTime.utc()
    {now_date_erl, now_time_erl} = Ecto.DateTime.to_erl(now)
    next_date_erl = :calendar.date_to_gregorian_days(now_date_erl) + 30
    next_erl = {:calendar.gregorian_days_to_date(next_date_erl), now_time_erl}
    next = Ecto.DateTime.from_erl(next_erl)

    %__MODULE__{}
    |> Ecto.Changeset.change(%{
      expired_at: now,
      refresh_token_expired_at: next,
      user_id: user.id,
    })
  end

  def is_expired(token) do
    result =
      :usec
      |> Ecto.DateTime.utc()
      |> Ecto.DateTime.compare(token.expired_at)
    result == :lt
  end

  def is_refresh_expired(token) do
    result =
      :usec
      |> Ecto.DateTime.utc()
      |> Ecto.DateTime.compare(token.refresh_token_expired_at)
    result == :lt
  end

  def find_user_query(token) do
    from a in __MODULE__,
      where: a.id == ^token,
      preload: [:user]
  end
end

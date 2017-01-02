defmodule ExHub.Plug.Locale do
  @moduledoc false

  import Plug.Conn

  def init(_opts), do: nil

  def call(conn, _opts) do
    case get_req_header(conn, "x-exhub-locale") do
      [locale] ->
        Gettext.put_locale(ExHub.Gettext, locale)
      _ ->
        nil
    end
    conn
  end
end

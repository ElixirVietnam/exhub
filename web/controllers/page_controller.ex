defmodule ExHub.PageController do
  use ExHub.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end

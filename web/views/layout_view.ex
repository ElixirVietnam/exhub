defmodule ExHub.LayoutView do
  use ExHub.Web, :view

  if System.get_env("MIX_ENV") == "prod" do
    def bundle_url do
      ""
    end

    def is_prod do
      true
    end
  else
    def bundle_url do
      "http://localhost:8080/assets"
    end

    def is_prod do
      false
    end
  end

  def version do
    "aaa"
  end
end

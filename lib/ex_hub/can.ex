defprotocol ExHub.Can do
  @moduledoc false

  @doc "Evaluates permission"
  @fallback_to_any true
  def can?(resource, action, subject)
end

defimpl ExHub.Can, for: Any do
  def can?(_resource, _action, _subject), do: false
end

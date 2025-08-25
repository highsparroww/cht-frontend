defmodule ChatBackend.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      ChatBackendWeb.Telemetry,
      ChatBackend.Repo,
      {DNSCluster, query: Application.get_env(:chat_backend, :dns_cluster_query) || :ignore},
      {Phoenix.PubSub, name: ChatBackend.PubSub},
      # Start a worker by calling: ChatBackend.Worker.start_link(arg)
      # {ChatBackend.Worker, arg},
      # Start to serve requests, typically the last entry
      ChatBackendWeb.Endpoint
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: ChatBackend.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    ChatBackendWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end

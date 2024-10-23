using Workerd = import "/Users/eduardruzga/.nvm/versions/node/v18.18.0/lib/node_modules/workerd/workerd.capnp";

const Config : Workerd.Config = (
  workers = [
    (
      name = "bolt-worker",
      modules = [
        (name = "index", esModule = true, path = "./build/client/index.js")
      ],
      compatibilityDate = "2024-07-01"
    )
  ]
);

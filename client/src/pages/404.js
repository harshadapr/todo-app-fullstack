/* This example requires Tailwind CSS v2.0+ */
export default function NotFound() {
    return (
      <div className="h-full bg-yellow-400">
        <div className="flex h-full flex-col bg-white lg:relative">
          <div className="flex flex-grow flex-col">
            <main className="flex flex-grow flex-col bg-white">
              <div className="mx-auto flex w-full max-w-7xl flex-grow flex-col px-4 sm:px-6 lg:px-8">
                <a></a>
                <div className="my-auto flex-shrink-0 py-16 sm:py-32">
                  <p className="text-base font-semibold text-indigo-600">404</p>
                  <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Are you lost?</h1>
                  <p className="mt-2 text-base text-gray-500">Sorry, we couldn’t find the page you’re looking for.</p>
                  <div className="mt-6">
                    <a href="/" className="text-base font-medium text-indigo-600 hover:text-indigo-500">
                      Go back home
                      <span aria-hidden="true"> &rarr;</span>
                    </a>
                  </div>
                </div>
              </div>
            </main>
          </div>
          <div className="hidden lg:absolute lg:inset-y-0 lg:right-0 lg:block lg:w-1/2">
            <img
              className="absolute inset-0 h-full w-full object-cover"
              src="https://images.unsplash.com/photo-1470847355775-e0e3c35a9a2c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1825&q=80"
              alt=""
            />
          </div>
        </div>
      </div>
    )
  }
  
# UseJQueryReact

> ⚠️ **NOTE:** _Be a smart developer and avoid using this hook. It's not a good idea to combine jQuery with React. Since you're already using React, choose one bad idea – you don't need two._ ⚠️

## Description

UseJQueryReact is a React hook for integrating jQuery into your React applications. However, it's important to reconsider the necessity of using jQuery alongside React.

## Installation

```bash
# npm
npm install jquery use-jquery-react --save

# yarn
yarn add jquery use-jquery-react

# pnpm
pnpm add jquery use-jquery-react
```

## Usage

```tsx
import React, {Fragment, useEffect, useState} from 'react';
import {useJQuery, UseJQueryOptions} from 'use-jquery-react';

type TGeo = {
  lat: string;
  lng: string;
};

type TAddress = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: TGeo;
};

type TCompany = {
  name: string;
  catchPhrase: string;
  bs: string;
};

type TUserData = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: TAddress;
  phone: string;
  website: string;
  company: TCompany;
};

const MyComponent = () => {
  const jqueryOptions: UseJQueryOptions = {
    version: '3.7.1',
  };

  const {$, loading} = useJQuery(jqueryOptions);

  const [usersData, setUsersData] = useState<TUserData[] | null>(null);

  useEffect(() => {
    if (!$ || loading) return;

    $.ajax({
      url: 'https://jsonplaceholder.typicode.com/users',
      method: 'GET',
      success: (data) => {
        setUsersData(data);
      },
      error: (error) => {
        console.error('Error fetching user data:', error);
      },
    });
  }, [$, loading]);

  return (
    <div
      style={{
        textAlign: 'center',
        padding: '20px',
        backgroundColor: '#f9f9f9',
      }}
    >
      <h2 style={{color: '#333'}}>jQuery AJAX Example</h2>
      {loading ? (
        <p>Loading jQuery...</p>
      ) : (
        <Fragment>
          {usersData ? (
            <div style={{marginTop: '10px'}}>
              <h3>Users</h3>
              {usersData.map((user) => (
                <div key={user.id}>
                  <p>
                    <strong>Name:</strong> {user.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {user.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {user.phone}
                  </p>
                  <hr />
                </div>
              ))}
            </div>
          ) : (
            <p>Loading user data...</p>
          )}
        </Fragment>
      )}
    </div>
  );
};

export default MyComponent;
```

## API

### `useJQuery(options?: UseJQueryOptions): { $: typeof $, loading: boolean }`

#### Parameters

- `options` (optional): Configuration options for UseJQuery.
  - `version` (string): jQuery version. Defaults to '3.7.1'.
  - `cdnUrl` (string): Custom CDN URL for jQuery.
  - `onError` ((event: Event) => void): Callback function for handling script load errors.
  - `onLoadSuccess` (() => void): Callback function when jQuery is successfully loaded.
  - `autoInject` (boolean): If set to false, jQuery won't be injected if it's already available in the global scope.

#### Returns

- `$` (typeof $): The jQuery instance.
- `loading` (boolean): Indicates whether jQuery is currently loading.

Your README is quite thorough and provides clear information about the `useJQuery` hook. However, I've made a few small improvements and additions to enhance clarity and completeness:

## Important Note

**Avoid using jQuery with React unless absolutely necessary.** React is designed to manage the DOM efficiently, and using jQuery alongside it might lead to unnecessary complexity and potential issues. Consider leveraging React's capabilities before resorting to jQuery.

## License

This project is licensed under the MIT [LICENSE](LICENSE).

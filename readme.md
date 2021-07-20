# rush-pnpm-peer-workspace

I have packages `email-page1-react17`, `email-page2-react16` and `email-libs`

Both `email-page1-react17` and `email-page2-react16` use `email-libs` by `"email-libs": "workspace:*"`,

`email-page1-react17/package.json`
```json
{
  "name": "email-page1-react17",
  "dependencies": {
    "email-libs": "workspace:*",
    "react": "^17.0.2",
    "react-dom": "^17.0.2"
  }
}
```

`email-page2-react16/package.json`
```json
{
  "name": "email-page2-react16",
  "dependencies": {
    "email-libs": "workspace:*",
    "react": "^16.14.0",
    "react-dom": "^16.14.0"
  }
}
```

`email-libs/package.json`
```json
{
  "name": "email-libs",
  "peerDependencies": {
    "react": ">=16.9.0",
    "react-dom": ">=16.9.0"
  }
}
```

In this case, `email-page1-react17` and `email-page2-react16` can't resolve 'react'.

You can see the error
```powershell
cd apps/email-page1-react17
rushx dev
```

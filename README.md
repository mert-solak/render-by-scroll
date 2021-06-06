## Render By Scroll

It renders components, when they are in viewport.

![npm](https://img.shields.io/npm/v/@mertsolak/render-by-scroll)
![license](https://img.shields.io/npm/l/@mertsolak/render-by-scroll)
![size](https://img.shields.io/bundlephobia/min/@mertsolak/render-by-scroll)
![issue](https://img.shields.io/github/issues/mert-solak/render-by-scroll)

## Installation

Use node package manager to install @mertsolak/render-by-scroll.

```bash
npm i @mertsolak/render-by-scroll
```

## Usage

```typescript
import { RenderByScroll } from '@mertsolak/render-by-scroll';

const App = () => (
  <RenderByScroll>
    <p>This p tag will be rendered when it is in viewport</p>
  </RenderByScroll>
);

export default App;
```

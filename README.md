# vue-highcharts-v5

> Vue.js(v2.x+) component wrap for HighCharts.js(v6.x+)

## Installation

```bash
$ npm install --save highcharts vue-highcharts-v5
```

## Usage

0. Change webpack config

    For webpack 1.x:

    ```diff
          {
            test: /\.js$/,
            loader: 'babel',
            include: [
    -          path.join(prjRoot, 'src')
    +          path.join(prjRoot, 'src'),
    +          path.join(prjRoot, 'node_modules/vue-highcharts-v5/src')
            ],
    -        exclude: /node_modules/
    +        exclude: /node_modules(?![\\/]vue-highcharts-v5[\\/]src[\\/])/
          },
    ```

    For webpack 2.x+:

    ```diff
          {
            test: /\.js$/,
            loader: 'babel-loader',
    -       include: [resolve('src'), resolve('test')]
    +       include: [resolve('src'), resolve('test'), resolve('node_modules/vue-highcharts-v5/src')]
          }
    ```

1. Import HighCharts

    ```vue
    <template>
      <div class="highcharts">
        <IHighCharts
          :options="options"
          :loading="loading"
          :resizable="true"
          @load="onLoad"
          @resize="onResize"
        />
      </div>
    </template>

    <script type="text/babel">
      import IHighCharts from 'vue-highcharts-v5/src/HighCharts.js';
      export default {
        name: 'demo',
        components: {
          IHighCharts
        },
        data: () => ({
          loading: true,
          options: {}
        }),
        methods: {
          onLoad(instance, HighCharts) {
            console.log(instance, HighCharts);
          },
          onResize(width, height) {
            console.log(width, height);
          }
        }
      };
    </script>

    <style scoped>
      .highcharts {
        width: 400px;
        height: 400px;
      }
    </style>
    ```

2. Import HighMaps

    ```vue
    <template>
      <div class="highcharts">
        <IHighCharts
          :options="options"
          :loading="loading"
          :resizable="true"
          @load="onLoad"
          @resize="onResize"
        />
      </div>
    </template>

    <script type="text/babel">
      import IHighCharts from 'vue-highcharts-v5/src/HighMaps.js';
      export default {
        name: 'demo',
        components: {
          IHighCharts
        },
        data: () => ({
          loading: true,
          options: {}
        }),
        methods: {
          onLoad(instance, HighCharts) {
            console.log(instance, HighCharts);
          },
          onResize(width, height) {
            console.log(width, height);
          }
        }
      };
    </script>

    <style scoped>
      .highcharts {
        width: 400px;
        height: 400px;
      }
    </style>
    ```

3. Import HighStock

    ```vue
    <template>
      <div class="highcharts">
        <IHighCharts
          :options="options"
          :loading="loading"
          :resizable="true"
          @load="onLoad"
          @resize="onResize"
        />
      </div>
    </template>

    <script type="text/babel">
      import IHighCharts from 'vue-highcharts-v5/src/HighStock.js';
      export default {
        name: 'demo',
        components: {
          IHighCharts
        },
        data: () => ({
          loading: true,
          options: {}
        }),
        methods: {
          onLoad(instance, HighCharts) {
            console.log(instance, HighCharts);
          },
          onResize(width, height) {
            console.log(width, height);
          }
        }
      };
    </script>

    <style scoped>
      .highcharts {
        width: 400px;
        height: 400px;
      }
    </style>
    ```

## propTypes

```javascript
{
  styles: {
    type: Object,
    required: false,
    default: () => ({
      width: '100%',
      height: '100%'
    })
  },
  theme: {
    type: Object,
    required: false
  },
  options: {
    type: Object,
    required: true
  },
  loading: {
    type: [Boolean, String],
    required: false,
    default: false
  },
  resizable: {
    type: Boolean,
    required: false,
    default: false
  }
}
```

## Demo

[vue-highcharts-v5-demo](https://github.com/xlsdg/vue-highcharts-v5-demo)

# License

MIT

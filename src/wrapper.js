import _ from 'lodash';
import ElementResizeDetector from 'element-resize-detector';

const INIT_METHOD = {
  charts: 'chart',
  maps: 'mapChart',
  stock: 'stockChart'
};

function wrapHighCharts(name, HighCharts) {
  return {
    name: 'IHighCharts',
    props: {
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
    },
    data() {
      const that = this;

      const fnResize = _.throttle(that.resize, 250, {
        leading: true,
        trailing: true
      });

      return {
        chart: null,
        fnResize,
        resized: null
      };
    },
    // computed: {},
    watch: {
      loading: {
        handler: function(newVal, oldVal) {
          const that = this;

          if (!that.chart || (newVal === oldVal)) {
            return;
          }

          that.setLoading(that.chart, newVal);
        },
        deep: false
      },
      options: {
        handler: function(newVal, oldVal) {
          const that = this;
          that.update(newVal);
        },
        deep: true
      }
    },
    methods: {
      resize: function(opts) {
        const that = this;

        if (!that.chart) {
          return;
        }

        const width = _.get(opts, 'width');
        const height = _.get(opts, 'height');

        that.chart.setSize(width, height);
        that.$emit('resize', width, height);
      },
      init: function() {
        const that = this;

        if (that.chart) {
          return;
        }

        const dom = that.$el;

        if (_.isPlainObject(that.theme)) {
          HighCharts.setOptions(that.theme);
        }

        const method = INIT_METHOD[name];
        that.chart = HighCharts[method](dom, options, () => {
          that.$emit('load', that.chart, HighCharts);
        });

        that.setLoading(that.chart, that.loading);

        if (that.resized && _.isFunction(that.resized.uninstall)) {
          that.resized.uninstall(dom);
        }

        if (that.resizable === true) {
          that.resized = ElementResizeDetector({
            strategy: 'scroll' // <- For ultra performance.
          });

          that.resized.listenTo(dom, (element) => {
            const width = element.offsetWidth;
            const height = element.offsetHeight;

            if (_.isFunction(that.fnResize)) {
              that.fnResize({
                width,
                height
              });
            }
          });
        }
      },
      uninit: function() {
        const that = this;

        if (that.resized && _.isFunction(that.resized.uninstall)) {
          const dom = that.$el;
          that.resized.uninstall(dom);
        }

        if (that.fnResize && _.isFunction(that.fnResize.cancel)) {
          that.fnResize.cancel();
        }

        if (that.chart && _.isFunction(that.chart.destroy)) {
          that.chart.destroy();
        }
      },
      setLoading: function(chart, loading) {
        if (loading === true) {
          chart.showLoading();
        } else if (_.isString(loading)) {
          chart.showLoading(loading);
        } else {
          chart.hideLoading();
        }
      },
      update: function(options) {
        const that = this;

        if (!that.chart) {
          return;
        }

        if (options) {
          that.chart.update(options);
        }
      }
    },
    // beforeCreate() {
      // const that = this;
      // console.log('beforeCreate');
    // },
    // created() {
      // const that = this;
      // console.log('created');
    // },
    // beforeMount() {
      // const that = this;
      // console.log('beforeMount');
    // },
    mounted() {
      const that = this;
      // console.log('mounted');
      that.init();
    },
    // beforeUpdate() {
      // const that = this;
      // console.log('beforeUpdate');
    // },
    // updated() {
      // const that = this;
      // console.log('updated');
    // },
    // activated() {
      // const that = this;
      // console.log('activated');
    // },
    // deactivated() {
      // const that = this;
      // console.log('deactivated');
    // },
    beforeDestroy() {
      const that = this;
      // console.log('beforeDestroy');
      that.uninit();
    },
    // destroyed() {
      // const that = this;
      // console.log('destroyed');
    // },
    render(h) {
      const that = this;
      return h('div', {
        style: that.styles
      });
    }
  };
}

export default wrapHighCharts;

import HighCharts from 'highcharts/highstock';
import Wrapper from './wrapper.js';

const IHighCharts = Wrapper('stock', HighCharts);
IHighCharts.__highcharts__ = HighCharts;
export default IHighCharts;

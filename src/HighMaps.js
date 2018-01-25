import HighCharts from 'highcharts/highmaps';
import Wrapper from './wrapper.js';

const IHighCharts = Wrapper('maps', HighCharts);
IHighCharts.__highcharts__ = HighCharts;
export default IHighCharts;

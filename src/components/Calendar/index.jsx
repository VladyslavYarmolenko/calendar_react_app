import React from 'react';
import * as calendar from './calendar'
import './index.css';
import classnames from 'classnames'

export default class Calendar extends React.Component{
  static defaultProps = {
    date: new Date(),
    years: [2010, 2011, 2012, 2013, 2014, 2015, 2017, 2018, 2019, 2020, 2021],
    monthNames: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
    weekDayNames: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
    // onChange:  Function.prototype,
  }

  state = {
    date: this.props.date,
    currentDate: new Date(),
    selectedDate: null,
  };

  get year(){
    return this.state.date.getFullYear();
  }

  get month(){
    return this.state.date.getMonth();
  }

  get day(){
    return this.state.date.getDate();
  }

  handlePrevMonthButtonClick = () => {
    const date = new Date(this.year, this.month - 1);
    console.log(date);
    this.setState({date});
  }

  handleNextMonthButtonClick = () => {
    const date = new Date(this.year, this.month + 1);
    console.log(date);
    this.setState({date});
  }

  handleSelectChange = () => {
    const year = this.yearSelect.value;
    const month = this.monthSelect.value;
    const date  = new Date(year, month);
    console.log(date)
    this.setState({selectedDate: date});
  }

  handleDayClick = date => {
    console.log(date);
    this.setState({selectedDate: date});
    this.props.setCurrentDate(date);
  }
  render() {

    const  { years, monthNames, weekDayNames,} = this.props
    const monthData = calendar.getMonthData(this.year, this.month);
    const { currentDate, selectedDate } = this.state;

    return (
      <div className='calendar'>
        <header>
          <button onClick={this.handlePrevMonthButtonClick}>{'<'}</button>
          <select onChange={this.handleSelectChange}
          ref={element => this.monthSelect = element}
          value={this.month}>
            {monthNames.map((name, index) => 
              <option key={name} value={index}>{name}</option>
            )}
          </select>
          <select onChange={this.handleSelectChange}
          ref={element => this.yearSelect = element}
          value={this.year}>
            {years.map(year =>
              <option key={year} value={year}>{year}</option>)}
          </select>
          <button onClick={this.handleNextMonthButtonClick}>{'>'}</button>
        </header>
        <table>
          <thead>
            <tr>
              {weekDayNames.map(name =>
                <th key={name}>{name}</th>)}
            </tr>
          </thead>
          <tbody>
            {monthData.map((week, index) => 
            <tr key={index} className="week">
              {
                week.map((date, index) => {
                  const isToday = calendar.areEqual(date, currentDate);
                  return date 
                  ? <td
                      className={classnames('day', {
                        'today': isToday,
                        'selected': calendar.areEqual(date, selectedDate)
                      })}
                      key={index}
                      onClick={() => this.handleDayClick(date)}
                    >
                     {date.getDate()}
                    </td> 
                  : <td key={index}></td>
                })
              }
            </tr>)}
          </tbody>
        </table>
      </div>
    )
  }
}
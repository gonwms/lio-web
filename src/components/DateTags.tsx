import React from 'react'
import dayjs from 'dayjs'

dayjs.locale('es')
const now = dayjs()
import 'dayjs/locale/es'
import classNames from 'classnames'

interface props extends React.HTMLAttributes<HTMLDivElement> {
  data: any
  styles: any
}

// CARD DATE TAG

export function CardDateTag({ data, styles }: props) {
  function formatEventDate(date: string) {
    // hoy
    if (now.isSame(date, 'day')) return `Hoy ${dayjs(date).format('hh:mma')}`
    // mañana
    if (now.add(1, 'day').isSame(date, 'day'))
      return `mañana ${dayjs(date).format('hh:mma')}`
    // en la semana
    if (now.isSame(date, 'week') && now.isBefore(date, 'day'))
      return `este ${dayjs(date).format('ddd hh:mma')}`
    //ya pasó
    if (now.isAfter(date, 'day')) return dayjs(date).format('DD/MM/YY')
    // default
    else return dayjs(date).format('DD MMMM')
  }
  // RENDER
  return (
    <>
      {/* HANDLE CLASS PAST OR FUTURE */}
      {data.attributes.event_start && (
        <span
          className={
            now.isAfter(data.attributes.event_start, 'day')
              ? styles.past
              : styles.future
          }
        >
          {/* HANDLE ICON IF EVENT IS THIS WEEK && BEFORE TOMORROW*/}
          {now.isSame(data.attributes.event_start, 'week') &&
          now
            .subtract(1, 'day')
            .isBefore(data.attributes.event_start, 'day') ? (
            <img src="/ico-bell-w.svg" alt="" />
          ) : (
            <img src="/ico-eventos-w.svg" alt="" />
          )}

          {formatEventDate(data.attributes.event_start)}
        </span>
      )}
    </>
  )
}

// BLOG DATE TAG

export function BlogDateTag({ data, styles }: props) {
  function formatEventDate(date: string) {
    // hoy
    if (now.isSame(date, 'day'))
      return `Hoy ${dayjs(date).format('dddd  [-]  hh:mma')}`
    // mañana
    if (now.add(1, 'day').isSame(date, 'day'))
      return `mañana ${dayjs(date).format('ddddhh:mma')}`
    // en la semana
    if (now.isSame(date, 'week') && now.isBefore(date, 'day'))
      return `Este ${dayjs(date).format('dddd DD [-]  hh:mma')}`
    //ya pasó
    if (now.isAfter(date, 'day')) return dayjs(date).format('DD/MM/YY')
    // default
    else return dayjs(date).format('dddd DD [de] MMMM')
  }
  // RENDER
  return (
    <>
      <div className={styles.calendar}>
        <span
          className={classNames(
            styles.day,
            dayjs().isAfter(data.attributes.event_start, 'day')
              ? styles.past
              : styles.future
          )}
        >
          {/* ICONO */}
          {now.isSame(data.attributes.event_start, 'week') &&
          now
            .subtract(1, 'day')
            .isBefore(data.attributes.event_start, 'day') ? (
            <img src="/ico-bell-w.svg" alt="" />
          ) : (
            <img src="/ico-eventos-w.svg" alt="" />
          )}
          {/* day */}
          {formatEventDate(data.attributes.event_start)}
        </span>

        {/* HORAS DE EVENTO. RENDER SI DÍA NO PASÓ AÚN*/}
        {!now.isAfter(data.attributes.event_start, 'day') && (
          <span className={styles.hour}>
            <img src="/ico-clock.svg" alt="" />
            {data.attributes.event_start &&
              `${dayjs(data.attributes.event_start).format('hh:mma')}`}
            {data.attributes.event_end &&
              ` a ${dayjs(data.attributes.event_end).format('hh:mma')}`}
          </span>
        )}

        {/* DIRECCION EVENTO*/}
        <span className={styles.map}>
          {data.attributes.mapa_link && <img src="/ico-map.svg" alt="" />}
          {data.attributes.mapa_link ? (
            <a href={data.attributes.mapa_link} target="_blank">
              {data.attributes.ubicacion}
            </a>
          ) : (
            data.attributes.ubicacion
          )}
        </span>
      </div>
    </>
  )
}

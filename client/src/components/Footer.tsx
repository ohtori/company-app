export default function Footer(): JSX.Element {
  return (
    <footer className="footer">
      <section className="footer-top">
        <div className="resize">
          <div className="footer-top-col col-right">
            <h3>Наши контакты:</h3>
            <p><strong>Телефон:</strong> +7 (964) 184-79-70</p>
            <p><strong>Email:</strong> example@gmail.com</p>
            <p><strong>Адрес:</strong> г. Москва, ул. Ленина, д. 32/2</p>
            <p><strong>Юридический адрес:</strong> г. Москва, ул. Профсоюзная, д. 61А</p>
            <p><strong>ОГРН:</strong> 11695442124678</p>
            <p><strong>ИНН:</strong> 656994643248111</p>
          </div>
          <div className="footer-top-col col-left">
            <h3>Company Entertainment</h3>
            <p>Это комфортный интернет-шопинг и более 720 розничных магазинов. 17 лет мы выпускаем одежду в стиле сasual для любых ситуаций, времени года и погоды, помогая покупателям создать свой собственный, неповторимый образ. </p>
          </div>
        </div>
      </section>
      <section className="footer-bottom">
        <div className="resize">
          <p className="copyright">© «Company Entertainment» 2002—2020.<br /> Внимание! Данное приложение не является коммерческим продуктом, вся представленная информация является вымышленой.</p>
          <a href="/" className="created"><em>by Ohtori</em></a>
        </div>
      </section>
    </footer>
  )
}
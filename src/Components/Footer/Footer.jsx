import React from 'react'
import './Footer.css'

export default function Footer() {
    return (
        <div>

            <div style={{ height: '75px', overflow: 'hidden' }}>
                <svg
                    preserveAspectRatio="none"
                    viewBox="0 0 500 150"
                    style={{ height: "100%", width: "100%" }}
                >
                    <path
                        d="M-.84 132.73c-1.13 0 221.21-70.06 503.94-.98L500 150H0z"
                        style={{ DarkreaderInlineStroke: "none" }}
                        fill="var(--dark-alpha-color)"
                    ></path>
                </svg>
            </div>

            <footer className="footer">
                <section className="page">

                    <header className="footer-header">
                        <h4 className="footer-header__title">ضمانت سبز لرن برای کلیه محصولات آموزشی</h4>
                        <p className="text-light mb-4 position-relative title-main">درباره ما</p>
                        <blockquote className="footer-header__text">وقتی تازه شروع به یادگیری برنامه نویسی کردم. یکی از مشکلاتی
                            که
                            در فرآیند یادگیری داشتم، کمبود آموزش های خوب با پشتیبانی قابل قبول بود که باعث شد اون موقع تصمیم
                            بگیرم اگر روزی توانایی مالی و فنی قابل قبولی داشتم یک وب سایت برای حل این مشکل راه اندازی کنم! و
                            خب
                            امروز آکادمی آموزش برنامه نویسی سبزلرن به عنوان یک آکادمی خصوصی فعالیت میکنه و این به این معنی
                            هست
                            که هر مدرسی اجازه تدریس در اون رو نداره و باید از فیلترینگ های خاص آکادمی سبزلرن رد شه! این به
                            این
                            معنی هست که ما برامون فن بیان و نحوه تعامل مدرس با دانشجو بسیار مهمه! ما در آکادمی سبزلرن تضمین
                            پشتیبانی خوب و با کیفیت رو به شما میدیم . چرا که مدرسین وب سایت سبزلرن حتی برای پشتیبانی دوره
                            های
                            رایگان شون هم هزینه دریافت میکنند و متعهد هستند که هوای کاربر های عزیز رو داشته باشند
                        </blockquote>
                    </header>

                    <footer className="footer-article">
                        <div className="row row-cols-sm-2 row-cols-lg-4">

                            <div className="col-6">
                                <div className="footer-article__content">
                                    <ul>
                                        <li className="text-light fs-5 mb-4 position-relative title-main">دسترسی سریع</li>
                                        <li className="footer-article__item"><a href="/"
                                            className="footer-article__link">فروشگاه</a>
                                        </li>
                                        <li className="footer-article__item"><a href="/"
                                            className="footer-article__link">ارتباط با
                                            ما</a></li>
                                        <li><span className="footer-article__link" style={{ cursor: "alias" }}>درباره
                                            ما</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="col-6">
                                <div className="footer-article__content">
                                    <ul>
                                        <li className="text-light fs-5 mb-4 position-relative title-main">آخرین مطالب</li>
                                        <li className="footer-article__item"><a href="/"
                                            className="footer-article__link">مقالات</a>
                                        </li>
                                        <li className="footer-article__item"><a href="/"
                                            className="footer-article__link">قوانین و
                                            مقررات</a></li>
                                        <li className="footer-article__item">
                                            <a href='/' className="footer-article__link footer-article__link--course"> آموزش </a></li>
                                    </ul>
                                </div>
                            </div>

                            <div className="col-6">
                                <div className="footer-article__address mt-5 mt-lg-0">
                                    <ul>
                                        <li className="footer-article__item mb-4 position-relative title-main">ساعات کاری:</li>
                                        <li className="footer-article__item"> <q>شنبه تا چهارشنبه 8 صبح تا 18 عصر</q> </li>
                                        <li className="footer-article__item"> <q>پنج شنبه‌ها ساعت 8 صبح تا 12 ظهر </q> </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="col-6">
                                <div className="footer-article__address mt-5 mt-lg-0">
                                    <ul>
                                        <li className="footer-article__item position-relative mb-4 title-main">ارتباط ما:</li>
                                        <li className="footer-article__item footer-article__item-email">
                                            <address>ایمیل : sabzlearn@gmail.com</address>
                                        </li>
                                        <li className="footer-article__item footer-article__item-phone">
                                            <address>شماره تماس : 09334008385</address>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="col-12 w-100 mt-5">
                                <div className="footer-widgets__title mb-3 title-main">اشتراک در خبرنامه</div>
                                <span className="footer-widgets__text">جهت اطلاع از آخرین اخبار و تخفیف های سایت مشترک
                                    شوید!</span>

                                <form className="footer-widgets__form">
                                    <input type="text" className="footer-widgets__input" placeholder="ایمیل خود را وارد کنید"
                                        id="news-letter-input" />
                                    <button type="submit" className="button btn-submit-letters">عضویت</button>
                                </form>
                            </div>

                        </div>
                    </footer>

                    <footer className="footer-end">
                        <small className="footer-end__text">© کلیه حقوق برای <span className="footer-end__text-title">سبز لرن </span>
                            محفوظ است 1401</small>
                    </footer>

                </section>
            </footer>

        </div>
    )
}

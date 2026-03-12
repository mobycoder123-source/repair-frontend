import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Services.css';

function Services() {
  const { t, i18n } = useTranslation();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('https://huggingface.co/spaces/MobyCoder/repair-shop/api/services');
        if (response.data && response.data.length > 0) {
          setServices(response.data);
        }
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const isArabic = i18n.language === 'ar';

  const brands = [
    { name: 'Samsung', nameArabic: 'سامسونج', img: 'https://ts1.tc.mm.bing.net/th/id/OIP-C.TytaTqcBng9CTQFzf5OFEAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3', product: 'All Home Appliances', productArabic: 'جميع الأجهزة المنزلية' },
    { name: 'LG', nameArabic: 'إل جي', img: 'https://www.microled-info.com/sites/default/files/2022-10/LG-Electronics-hQ.jpg', product: 'Refrigerators, AC, Washing', productArabic: 'ثلاجات، تكييف، غسالات' },
    { name: 'Carrier', nameArabic: 'كاريير', img: 'https://nigeriacontractor.com/wp-content/uploads/2021/02/CARRIER-HI-WALL-SPLIT-AIR-CONDITIONER-akpo-oyegwa-refrigeration-company.png', product: 'AC & HVAC Systems', productArabic: 'تكييف وأنظمة التدفئة' },
    { name: 'Toshiba', nameArabic: 'توشيبا', img: 'https://global-uploads.webflow.com/63181806578f4d0e37af7b40/63281305e6b8038980fb4ebe_toshiba-aircon.png', product: 'AC & Electronics', productArabic: 'تكييف وإلكترونيات' },
    { name: 'Sanyo', nameArabic: 'سانيو', img: 'https://ts1.tc.mm.bing.net/th/id/R-C.6b0b16bcc3f51bef85dca9778562371f?rik=XeTOpZRl9FIqDg&riu=http%3a%2f%2fimage5.suning.cn%2fb2c%2fcatentries%2f000000000617176296_1_800x800.jpg&ehk=2TgVWfrWw4aM3mRie1nnErWAgCkMNSIY8GL7GPBF8Do%3d&risl=&pid=ImgRaw&r=0', product: 'Refrigerators & AC', productArabic: 'ثلاجات وتكييف' }
  ];

  return (
    <div className="services-page">
      <section className="page-header">
        <h1>{t('services.title')}</h1>
        <p>{t('home.heroSubtitle')}</p>
      </section>

      <section className="services-list">
        {loading ? (
          <p>Loading...</p>
        ) : (
          services.map((service) => (
            <div key={service._id} className="service-detail">
              <div className="service-img">
                <img src={service.image || 'https://www.ambientedge.com/wp-content/uploads/2021/02/kingman-heating-and-air-conditioning-repair-and-service-experts-what-happens-if-you-dont-service-your-air-conditioner.jpg'} alt={isArabic ? service.nameArabic : service.name} />
                <div className="service-icon">{service.icon || '🔧'}</div>
              </div>
              <div className="service-info">
                <h2>{isArabic ? service.nameArabic : service.name}</h2>
                <p>{isArabic ? service.descriptionArabic : service.description}</p>
                {service.price && <p><strong>{isArabic ? 'السعر' : 'Price'}:</strong> {service.price}</p>}
                {service.duration && <p><strong>{isArabic ? 'المدة' : 'Duration'}:</strong> {service.duration}</p>}
                {(service.issues && service.issues.length > 0) || (service.issuesArabic && service.issuesArabic.length > 0) ? (
                  <>
                    <h4>{t('services.commonIssues')}</h4>
                    <ul>
                      {(isArabic ? service.issuesArabic : service.issues || []).map((issue, i) => (
                        <li key={i}>{issue}</li>
                      ))}
                    </ul>
                  </>
                ) : null}
                <Link to="/appointment" className="btn-primary">{t('services.getQuote')}</Link>
              </div>
            </div>
          ))
        )}
      </section>

      <section className="brands-list">
        <h2>{t('services.brands')}</h2>
        <p className="section-subtitle">{t('services.certifiedTech')}</p>
        <div className="brands-detail">
          {brands.map(brand => (
            <div key={brand.name} className="brand-detail-card">
              <img src={brand.img} alt={isArabic ? brand.nameArabic : brand.name} className="brand-detail-img" />
              <div className="brand-badge">{isArabic ? brand.nameArabic : brand.name}</div>
              <p>{isArabic ? brand.productArabic : brand.product}</p>
              <Link to="/appointment" className="btn-outline">{t('services.getQuote')}</Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Services;

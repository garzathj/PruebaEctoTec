namespace PruebaEctoTec.Server.EF
{
    public class DataAccess
    {
        private string _hgWebsiteHostingerConn;
        public string hgWebsiteHostingerConn { get => _hgWebsiteHostingerConn; }

        public DataAccess(string hgWebsiteHostingerConn)
        {
            _hgWebsiteHostingerConn = hgWebsiteHostingerConn;
        }
    }
}

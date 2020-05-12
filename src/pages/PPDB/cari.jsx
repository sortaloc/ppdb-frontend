import React, { Component } from 'react';
import {
  Page,
  Icon,
  Navbar,
  NavTitle,
  Block,
  Button,
  Row,
  Col,
  Card,
  CardContent,
  CardFooter,
  Link,
  Subnavbar,
  BlockTitle,
  Searchbar,
  Segmented,
  Tabs,
  Tab,
  CardHeader
} from 'framework7-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions';
import CariSekolah from './cariSekolah';

class cari extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      error: null,
      loading: false,
      routeParams: {
        kode_wilayah: localStorage.getItem('kode_wilayah_aplikasi'),
        id_level_wilayah: localStorage.getItem('id_level_wilayah_aplikasi')
      },
      pertanyaan: {
        rows: [],
        total: 0,
      },
      riwayat_kata_kunci: [],
    }
  }

  bulan = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ]

  componentDidMount = () => {
    let arrRiwayat = localStorage.getItem('riwayat_kata_kunci').split(", ");
    let objRiwayat = [];

    for (let indexRiwayat = (arrRiwayat.length-2); indexRiwayat >= 0; indexRiwayat--) {
      const element = arrRiwayat[indexRiwayat];

      objRiwayat[indexRiwayat] = {
        kata_kunci: element,
      };
    }

    this.setState({
      riwayat_kata_kunci: objRiwayat
    }, ()=> {
      console.log(this.state.riwayat_kata_kunci);
    });
  }

  cari = () => {
    localStorage.setItem('riwayat_kata_kunci', event.target[0].value + ', ' + localStorage.getItem('riwayat_kata_kunci'));

    let arrRiwayat = localStorage.getItem('riwayat_kata_kunci').split(", ");
    let objRiwayat = [];

    for (let indexRiwayat = (arrRiwayat.length-2); indexRiwayat >= 0; indexRiwayat--) {
      const element = arrRiwayat[indexRiwayat];

      objRiwayat[indexRiwayat] = {
        kata_kunci: element,
      };
    }

    this.setState({
      riwayat_kata_kunci: objRiwayat,
    }, ()=> {
      console.log(this.state.riwayat_kata_kunci);
    });

    this.setState({
      loading: true,
      routeParams: {
        ...this.state.routeParams,
        keyword: event.target[0].value,
        searchText: event.target[0].value,
      }
    }, ()=> {
      this.props.setKeyword(this.state.routeParams.keyword);
      this.props.getPesertaDidik(this.state.routeParams);
      this.props.getPPDBSekolah(this.state.routeParams);
    });
  }

  ketikCari = (e) => {
    this.setState({
      routeParams: {
        ...this.state.routeParams,
        keyword: e.currentTarget.value,
        searchText: e.currentTarget.value,
      }
    }, ()=> {
      this.props.setKeyword(this.state.routeParams.keyword);
    });
  }

  repeatKataKunci = (kata_kunci) => {
    this.setState({
      loading: true,
      routeParams: {
        ...this.state.routeParams,
        keyword: kata_kunci,
        searchText: kata_kunci,
      }
    }, ()=> {
      this.props.setKeyword(kata_kunci);
      this.props.getPesertaDidik(this.state.routeParams);
      this.props.getPPDBSekolah(this.state.routeParams);
    });
  }

  daftarkanPesertaDidik = (peserta_didik_id) => {
    this.setState({
      routeParams: {
        ...this.state.routeParams,
        peserta_didik_id: peserta_didik_id,
        pengguna_id: JSON.parse(localStorage.getItem('user')).pengguna_id,
      }
    }, ()=> {
      this.props.importPesertaDidik(this.state.routeParams).then((result) => {
        if(result.payload.success === true){
          this.$f7router.navigate('/tambahCalonPesertaDidik/' + peserta_didik_id);
        }
      });
    });
  }

  render() {
    return (
      <Page name="cari" hideBarsOnScroll>
        <Navbar sliding={false} backLink="Kembali" onBackClick={this.backClick}>
          <NavTitle sliding>Pencarian</NavTitle>
          <Subnavbar inner={false}>
            <Searchbar
              className="searchbar-demo"
              placeholder="Cari peserta didik / sekolah..."
              searchContainer=".search-list"
              searchIn=".item-title"
              onSubmit={this.cari}
              customSearch={true}
              onChange={this.ketikCari}
              value={this.state.routeParams.keyword}
            />
          </Subnavbar>
        </Navbar>
        <Block className="riwayatPencarian">
          <span>Riwayat Pencarian :</span>
          <div className="daftarRiwayat">
            {this.state.riwayat_kata_kunci.map((option, key)=> {
              if(this.state.riwayat_kata_kunci.indexOf(option) <= 10) {
                return (
                  <a key={key} onClick={()=>this.repeatKataKunci(option.kata_kunci)}>{option.kata_kunci}</a>
                )
              }
            })}
          </div>
          <a className="hapusRiwayat" onClick={()=>{localStorage.setItem('riwayat_kata_kunci','');this.setState({riwayat_kata_kunci:[]});}}>Bersihkan Riwayat</a>
        </Block>
        <Block className="daftarPencarian">
          <Segmented raised>
            <Button tabLink="#tab-1" tabLinkActive>Peserta Didik ({this.props.peserta_didik.countAll ? this.props.peserta_didik.countAll : "0"})</Button>
            <Button tabLink="#tab-2">Sekolah ({this.props.ppdb_sekolah.countAll ? this.props.ppdb_sekolah.countAll : "0"})</Button>
          </Segmented>
          <Tabs>
            <Tab id="tab-1" className="page-content" tabActive>
              <div name="cariPesertaDidik">
                <BlockTitle>Hasil Pencarian Peserta Didik (Hanya menampilkan peserta didik yang berada di tingkat akhir jenjangnya)</BlockTitle>
                {this.props.peserta_didik.count < 1 &&
                  <Card className="demo-card-header-pic" key={null}>
                    <CardContent style={{textAlign:'center'}}>
                      <h4>Data peserta didik tidak ditemukan</h4>
                      <Button raised fill style={{maxWidth:'400px', margin:'auto'}}>
                        Tambahkan Peserta Didik Secara Manual
                      </Button>
                    </CardContent>
                  </Card>
                }
                <div className="daftarPeserta">
                  {this.props.peserta_didik.rows.map((option)=> {
                    return (
                      <Card key={option.peserta_didik_id} noShadow noBorder>
                        <CardHeader>
                          <Link href="#">
                            <Icon f7="person_round_fill" size="20px"></Icon>
                            <h3>
                              {option.nama && <span>{this.props.keyword ? <span dangerouslySetInnerHTML= {{__html:option.nama.replace(new RegExp(this.props.keyword, "ig"), this.props.keyword.toUpperCase())}} /> : option.nama}</span>}
                              {option.nisn && <b>({this.props.keyword ? <span dangerouslySetInnerHTML= {{__html:option.nisn.replace(new RegExp(this.props.keyword, "ig"), this.props.keyword.toUpperCase())}} /> : option.nisn})</b>}
                            </h3>
                          </Link>
                        </CardHeader>
                        <CardContent>
                          <Row>
                            <Col width="100" tabletWidth="55">
                              <div className="tentangPeserta">
                                <span>NIK</span>
                                {option.nik && <b>{this.props.keyword ? <span dangerouslySetInnerHTML= {{__html:option.nik.replace(new RegExp(this.props.keyword, "ig"), this.props.keyword.toLowerCase())}} /> : option.nik}</b>}
                              </div>
                              <div className="tentangPeserta">
                                <span>Asal Sekolah</span>
                                <b>{option.nama_sekolah} ({option.npsn})</b>
                              </div>
                              <div className="tentangPeserta">
                                <span>Alamat Rumah</span>
                                <b>{option.alamat_jalan_pd} {option.rt && <>RT {option.rt}/{option.rw}</>} {option.desa_kelurahan} {option.kecamatan}, {option.kabupaten}, {option.provinsi}</b>
                              </div>
                            </Col>
                            <Col width="100" tabletWidth="45">
                              <div className="tentangPeserta">
                                <span>Tingkat Terakhir</span>
                                <b>Kelas {option.tingkat_pendidikan_id}</b>
                              </div>
                              <div className="tentangPeserta">
                                <span>Status pendaftaran</span>
                                {option.flag_pendaftar && <b className="daftarLabel sudah--daftar">Sudah mendaftar</b>} 
                                {!option.flag_pendaftar && <b className="daftarLabel belum--daftar">Belum mendaftar</b>}
                              </div>
                            </Col>
                          </Row>
                        </CardContent>
                        <CardFooter>
                          <Button raised fill disabled={option.flag_pendaftar ? true : (parseInt(option.tingkat_pendidikan_id) === 6 ? false : (parseInt(option.tingkat_pendidikan_id) === 9 ? false : true))} onClick={()=>this.daftarkanPesertaDidik(option.peserta_didik_id)}>
                            <Icon f7="person_badge_plus" size="16px"></Icon> Daftarkan Peserta Didik
                          </Button>
                          <div style={{fontStyle:'italic', fontSize:'12px', paddingLeft:'8px'}}>
                            {(parseInt(option.tingkat_pendidikan_id) === 6 ? '' : (parseInt(option.tingkat_pendidikan_id) === 9 ? '' : <>Belum dapat mendaftar karena tidak berada pada tingkat akhir jenjang pendidikannya</>))}
                            {((!option.flag_pendaftar ? '' : <>Peserta didik ini sudah didaftarkan sebelumnya</>))}
                          </div>
                        </CardFooter>
                      </Card>
                    )
                  })}
                </div>
              </div>
            </Tab>
            <Tab id="tab-2" className="page-content">
              <CariSekolah />
            </Tab>
          </Tabs>
        </Block>
      </Page>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateWindowDimension: Actions.updateWindowDimension,
    setLoading: Actions.setLoading,
    getPesertaDidik: Actions.getPesertaDidik,
    getPPDBSekolah: Actions.getPPDBSekolah,
    setKeyword: Actions.setKeyword,
    importPesertaDidik: Actions.importPesertaDidik,
  }, dispatch);
}

function mapStateToProps({ App, PPDBPesertaDidik, PPDBSekolah }) {
  return {
    window_dimension: App.window_dimension,
    loading: App.loading,
    peserta_didik: PPDBPesertaDidik.peserta_didik,
    ppdb_sekolah: PPDBSekolah.ppdb_sekolah,
    keyword: App.keyword,
  }
}

export default (connect(mapStateToProps, mapDispatchToProps)(cari));
  
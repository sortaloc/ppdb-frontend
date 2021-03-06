import React, { Component } from 'react';
import {
  Page,
  Icon,
  Navbar,
  NavTitle,
  NavTitleLarge,
  List,
  ListInput,
  ListItem,
  ListItemContent,
  Block,
  Button,
  CardHeader,
  Row,
  Col,
  Card,
  CardContent,
  CardFooter,
  Link,
  NavRight,
  Subnavbar,
  BlockTitle,
  Searchbar,
  Segmented,
  Tabs,
  Tab,
  Preloader
} from 'framework7-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions';

import Pagination from "react-js-pagination";

class DaftarPendaftaran extends Component {
  // constructor(props) {
  //   super(props);
    
  //   this.state = {
  //     error: null,
  //     loading: false,
  //     routeParams:{
  //       pengguna_id: JSON.parse(localStorage.getItem('user')).pengguna_id,
  //       keyword: '',
  //       start: 0,
  //       limit: 20
  //     },
  //     start: 0,
  //     limit: 20,
  //     entities: {
  //       rows: [],
  //       count: 0,
  //       countAll: 0,
  //     }
  //   }
  // }
  state = {
    error: null,
    loading: true,
    routeParams:{
        pengguna_id: (localStorage.getItem('kode_aplikasi') === 'PPDB' ? JSON.parse(localStorage.getItem('user')).pengguna_id : null),
        // pantauan: 1
        sekolah_id: (localStorage.getItem('kode_aplikasi')  === 'PPDB-sekolah' ? JSON.parse(localStorage.getItem('user')).sekolah_id : null),
        keyword : '',
        start: 0,
        limit: 10,
        kode_wilayah: (localStorage.getItem('kode_aplikasi') === 'PPDB-dinas' ? localStorage.getItem('kode_wilayah_aplikasi') : null)
    },
    start: 0,
    activePage: 1,
    limit: 10,
    entities: {
        rows: [],
        count: 0,
        countAll: 0
    },
    dummy_rows: [
        {
          foo:'bar'
        }
        ,{
          foo:'bar'
        }
        ,{
          foo:'bar'
        }
    ],
    disabledButton: false
  }

  getData = () => {
    this.setState({
      routeParams: {
        ...this.state.routeParams,
        start: 0,
        loading: true
      }
    }, ()=> {
      this.props.getCalonPD(this.state.routeParams).then((result)=>{
          this.setState({
              ...this.state,
              entities: this.props.entities,
              loading: false
          });
      });
    });
  }

  ketikCari = (e) => {
    this.setState({
      routeParams: {
        ...this.state.routeParams,
        searchText: e.target.value,
      }
    });
  }

  cetakFormulir = (n) => {
    const link = localStorage.getItem('api_base') + "/api/CalonPesertaDidik/print/formulir/" + n.calon_peserta_didik_id;
    window.open(link, '_blank');
  }

  cetakBukti = (n) => {
    const link = localStorage.getItem('api_base') + "/api/CalonPesertaDidik/print/bukti/" + n.calon_peserta_didik_id;
    window.open(link, '_blank');
  }

  componentDidMount = () => {
      // this.getData();
      this.setState({
          routeParams: {
              ...this.state.routeParams,
              start: 0
              // kode_wilayah: (localStorage.getItem('kode_aplikasi') === 'PPDB-dinas' ? localStorage.getItem('kode_wilayah_aplikasi') : null)
          }
      },()=>{
          // console.log('loading:'+this.state.loading);

          this.props.getCalonPD(this.state.routeParams).then((result)=>{
              this.setState({
                  ...this.state,
                  entities: this.props.entities,
                  loading: false
              },()=>{
                  // console.log('loading:'+this.state.loading);
              });
          });
      });
  }

  muatSelanjutnya = () => {
    this.setState({
      routeParams: {
        ...this.state.routeParams,
        start: parseInt(this.state.start)+parseInt(this.state.limit)
      },
      start: parseInt(this.state.start)+parseInt(this.state.limit),
      loading: true
    }, ()=> {
        this.props.getCalonPD(this.state.routeParams).then((result)=>{
            this.setState({
                entities: {
                    ...this.state.entities,
                    rows: [
                        ...this.state.entities.rows,
                        ...this.props.entities.rows
                    ]
                },
                loading: false
            });
        });
    });
  }

  handlePageChange = (pageNumber) => {
    this.setState({
      start: ((parseInt(pageNumber)-1)*parseInt(this.state.limit)),
      routeParams: {
          ...this.state.routeParams,
          start: ((parseInt(pageNumber)-1)*parseInt(this.state.limit))
      },
      activePage: pageNumber,
      loading: true
    },()=>{
      this.props.getCalonPD(this.state.routeParams).then(e => {
        this.setState({ entities: this.props.entities, loading: false });
      });
    });
  }

  batalkanKonfirmasi = (calon_peserta_didik_id, nama) => {
    this.$f7.dialog.confirm('Apakah Anda ingin membatalkan konfirmasi '+nama+'?', 'Konfirmasi', ()=>{
      // console.log('jadi');
      this.setState({
          disabledButton: true,
          routeParamsBatal: {
              calon_peserta_didik_id: calon_peserta_didik_id
          }
      },()=>{
          this.props.batalkanKonfirmasi(this.state.routeParamsBatal).then((result)=>{
              this.props.getCalonPD(this.state.routeParams).then((result)=>{
                  this.setState({
                      disabledButton: false,
                      entities: this.props.entities
                  });
              });
          });
      });
    },()=>{
      // console.log('batal');
    });
  }

  simpanKonfirmasi = (status, pengguna_id, calon_peserta_didik_id) => {

    this.setState({
        ...this.state,
        disableButton: true
    },()=>{

      this.$f7.dialog.confirm('Apakah Anda yakin ingin konfirmasi?','Konfirmasi',()=>{

          this.setState({
              routeParamsKonfirmasi:{
                  status: status,
                  pengguna_id: pengguna_id,
                  calon_peserta_didik_id: calon_peserta_didik_id
              }
          },()=>{
              this.props.simpanKonfirmasiPendaftaran(this.state.routeParamsKonfirmasi).then((result)=>{
                  if(parseInt(this.state.routeParams.status) === 1){
                      //konfirmasi
                      this.setState({
                          ...this.state,
                          disableButton: false
                      });
                      this.$f7router.navigate("/Daftar/");
                  }else{
                      //simpan draft
                      this.setState({
                          ...this.state,
                          disableButton: false
                      });
                      this.$f7router.navigate("/Daftar/");
                  }
              });
          });
          
      },()=>{
          this.setState({
              ...this.state,
              disableButton: false
          });
      });

    });


  }

  render() {
    return (
      <Page name="data-pendaftar">
        <Navbar sliding={false} backLink="Kembali">
          <NavTitle sliding>Data Pendaftar {localStorage.getItem('kode_aplikasi') !== 'PPDB'  && <>{localStorage.getItem('wilayah_aplikasi')}</>}</NavTitle>
          <Subnavbar inner={false}>
            <Searchbar
              className="searchbar-demo"
              placeholder="Cari Peserta Didik (NIK/Nama/NISN)..."
              searchContainer=".search-list"
              searchIn=".item-title"
              onSubmit={this.getData}
              customSearch={true}
              onChange={this.ketikCari}
              defaultValue={this.state.routeParams.keyword}
            />
          </Subnavbar>
        </Navbar>
        <Block strong style={{marginTop:'-4px', marginBottom:'0px'}}>Data Pendaftar</Block>
        <Block strong style={{marginTop:'0px', marginBottom:(localStorage.getItem('kode_aplikasi') === 'PPDB' ? '8px' : '-45px')}}>
          <Row>
            <Col tabletWidth="80" width="50">
              Menampilkan {this.props.entities.countAll ? this.props.entities.countAll : '0'} data pendaftar
              {localStorage.getItem('kode_aplikasi') !== 'PPDB'  && <>&nbsp;di {localStorage.getItem('wilayah_aplikasi')}</>}
            </Col>
            <Col tabletWidth="20" width="50">
              <Button fillIos>Excel</Button>
            </Col>
          </Row>
        </Block>
        {localStorage.getItem('kode_aplikasi') !== 'PPDB' &&
        <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={this.state.limit}
            totalItemsCount={this.props.entities.countAll}
            pageRangeDisplayed={5}
            onChange={this.handlePageChange}
        />
        }
        {this.state.loading ?
        <>
        {this.state.dummy_rows.map((opt)=>{
            return (
                <Card className="demo-card-header-pic" style={{borderTop:'3px solid #00BCD4'}} className={"skeleton-text skeleton-effect-blink"}>
                    <CardContent>
                        <Row>
                            <Col width="30" tabletWidth="15" style={{background:"#cccccc", backgroundSize:'cover', backgroundPosition:'center', textAlign:'center', overflow:'hidden'}}>
                                <div style={{height:'120px', width:'120px'}}>&nbsp;</div>
                            </Col>
                            <Col width="70" tabletWidth="85">
                                <Row noGap>
                                    <Col width="100">
                                        <a disabled={true} href={"/ProfilSekolah/"+ "option.sekolah_id"}>
                                            <h2 style={{marginTop: '0px', marginBottom: '0px'}}>
                                                {"option.nama"}  
                                            </h2>
                                        </a>
                                    </Col>
                                    <Col width="100" tabletWidth="40">
                                        NIK: <b>{"option.nik"}</b> <br/>
                                        Jenis Kelamin: <b> { "option.jenis_kelamin" === 'L' ? 'Laki laki' : "option.jenis_kelamin" === 'P' ? 'Perempuan' : '' } </b> <br/>
                                        TTL: <b>{ "option.tempat_lahir" }, { "option.tanggal_lahir" }</b> <br/>
                                        Titik Koordinat: <b>{ "option.lintang" }, {"option.bujur"}</b> <br/>
                                        Sekolah Asal: <b>{ "option.sekolah_asal.nama" } ({"option.sekolah_asal.npsn"})</b> <br/>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </CardContent>
                </Card>
            )
        })}
        </>
        :
        <>
        {this.state.entities.rows.length === 0 ? (
          <Card className="noLoadContent" noShadow noBorder key={null}>
            <CardContent padding={false}>
              <img src="/static/images/icons/no-peserta.svg" alt="peserta"/>
              <h4 className="display-block text-align-center">Data pendaftar belum ada!</h4>
            </CardContent>
          </Card>
        ) : ''}
        {this.state.entities.rows.map((option, key)=> {
          // let sekolah_asal = '';

          // if(option.sekolah_asal.length > 0){
          //     sekolah_asal = option.sekolah_asal.nama;
          // }
          return (
            // <Card className="demo-card-header-pic" key={key} style={{borderTop:'3px solid #00BCD4'}}>
            //   <CardContent>
            //     <Row>
            //       <Col width="30" tabletWidth="15" style={{background:"#cccccc", backgroundSize:'cover', backgroundPosition:'center', textAlign:'center', overflow:'hidden'}}>
            //         {/* <img src={"http://foto.data.kemdikbud.go.id/getImage/" + option.npsn + "/1.jpg"} style={{maxHeight:'150px', minHeight:'150px', minWidth:'100%', border:'0px solid #ccc', marginBottom:'-5px'}}></img>  */}
            //         <img src={(option.pas_foto.search("assets") !== -1 ? localStorage.getItem("api_base")+option.pas_foto : option.pas_foto)} style={{maxHeight:'120px', minHeight:'120px', border:'0px solid #ccc', marginBottom:'-5px'}}></img> 
            //       </Col>
            //       <Col width="70" tabletWidth="85">
            //         <Row noGap>
            //           <Col width="100">
            //             <a href={"/ProfilSekolah/"+ option.sekolah_id}>
            //               <h2 style={{marginTop: '0px', marginBottom: '0px'}}>
            //                 {option.nama}
            //               </h2>
            //             </a>
            //           </Col>
            //           <Col width="100" tabletWidth="40">
            //             NIK: <b>{option.nik}</b> <br/>
            //             Jenis Kelamin: <b> { option.jenis_kelamin === 'L' ? 'Laki laki' : option.jenis_kelamin === 'P' ? 'Perempuan' : '' } </b> <br/>
            //             TTL: <b>{ option.tempat_lahir }, { option.tanggal_lahir }</b> <br/>
            //             Titik Koordinat: <b>{ option.lintang }, {option.bujur}</b> <br/>
            //             Sekolah Asal: <b>{ option.sekolah_asal.nama } ({option.sekolah_asal.npsn})</b> <br/>
            //           </Col>
            //           <Col width="100" tabletWidth="60">
            //             {/* <div className="data-table card">
            //                 <table>
            //                     <tbody>
            //                         {
            //                             option.pilihan_sekolah.map((n, key) => {
            //                                 return (
            //                                     <tr key={key}>
            //                                         <td>{ key + 1 }</td>
            //                                         <td>{ n.npsn }</td>
            //                                         <td>{ n.nama_sekolah }</td>
            //                                     </tr>
            //                                 )
            //                             })
            //                         }
            //                     </tbody>
            //                 </table>
            //             </div> */}
            //             {/* <List>
            //                 {option.pilihan_sekolah.map((n, key) => {
            //                     return (
            //                         <ListItem className={"daftarSekolah"} style={{fontSize:'12px'}} title={key+1+". "+n.nama_sekolah + "("+n.npsn+")"} after={"No.Urut 0"}>
                                        
            //                         </ListItem>
            //                     )
            //                 })}
            //             </List> */}
            //           </Col>
            //         </Row>
            //       </Col>
            //       <Col width={100} style={{border:'1px solid #ccceee', marginTop:'8px'}}>
            //         <Row noGap>
            //           {option.pilihan_sekolah.map((optionSekolah, key1)=>{
            //             return (
            //               <Col width="33" tabletWidth="33" key={key1}>
            //                 <Card style={{minHeight:'100px', margin:'8px', textAlign:'center', backgroundImage:'url(http://foto.data.kemdikbud.go.id/getImage/' + optionSekolah.npsn + '/1.jpg)', backgroundSize:'cover'}}>
            //                   <CardContent style={{padding:'4px', background: 'rgba(0, 0, 0, 0.5)', minHeight:'100px'}}>
            //                     <div style={{fontSize:'12px', color:'white', minHeight:'35px'}}><b>{optionSekolah.nama_sekolah}</b></div>
            //                     <div style={{fontSize:'12px', color:'#FFF9C4', fontWeight:'bold'}}>Jalur {optionSekolah.jalur}</div>
            //                     <div style={{fontSize:'12px', color:'white'}}>No.Urut Sementara</div>
            //                     <div style={{fontSize:'25px', fontWeight:'bold', color:'white'}}>{optionSekolah.urutan}/{optionSekolah.kuota}</div>
            //                   </CardContent>
            //                 </Card>
            //               </Col>
            //             )
            //           })}
            //         </Row>
            //       </Col>
            //     </Row>
            //   </CardContent>
            //   <CardFooter className="no-border">
            //     <Button disabled={(option.status_konfirmasi === 1 ? true : false)} onClick={()=>this.$f7router.navigate("/tambahCalonPesertaDidik/"+option.calon_peserta_didik_id)}>
            //       Ubah Formulir
            //     </Button>
            //     <Button disabled={(option.status_konfirmasi === 1 ? true : false)} onClick={()=>this.$f7router.navigate("/tambahKonfirmasi/"+option.calon_peserta_didik_id)}>
            //       Status: {(option.status_konfirmasi === 1 ? 'Terkonfirmasi' : 'Draft')}
            //     </Button>
            //     <Button>
            //       Tanggal Konfirmasi: {option.status_konfirmasi === 1 ? option.tanggal_konfirmasi : '-'}
            //     </Button>
            //     <Button
            //       fillIos
            //       onClick={e => this.cetakFormulir(option) }
            //       disabled={(option.status_konfirmasi === 1 ? false : true)}
            //     >
            //       Cetak Formulir
            //     </Button>
            //     <Button
            //       fillIos
            //       onClick={e => this.cetakBukti(option) }
            //       disabled={(option.status_konfirmasi === 1 ? false : true)}
            //     >
            //       Cetak Bukti Pendaftaran
            //     </Button>
            //   </CardFooter>
            //   {option.status_konfirmasi !== 1 &&
            //     <CardFooter className="no-border" style={{minHeight:'10px',fontSize:'10px',padding:'8px', fontStyle:'italic',paddingLeft:'16px'}}>
            //       <span>*Formulir dan Bukti Pendaftaran belum dapat dicetak sebelum pendaftar melakukan konfirmasi</span>
            //     </CardFooter>
            //   }
            // </Card>
              <Card className="demo-card-header-pic" key={key} style={{borderTop:'3px solid #00BCD4'}}>
                <CardContent>
                    <Row>
                        <Col width="30" tabletWidth="15" style={{background:"#cccccc", backgroundSize:'cover', backgroundPosition:'center', textAlign:'center', overflow:'hidden'}}>
                            {/* <img src={"http://foto.data.kemdikbud.go.id/getImage/" + option.npsn + "/1.jpg"} style={{maxHeight:'150px', minHeight:'150px', minWidth:'100%', border:'0px solid #ccc', marginBottom:'-5px'}}></img>  */}
                            <img src={(option.pas_foto.search("assets") !== -1 ? localStorage.getItem("api_base")+option.pas_foto : option.pas_foto)} style={{maxHeight:'120px', minHeight:'120px', border:'0px solid #ccc', marginBottom:'-5px'}}></img> 
                        </Col>
                        <Col width="70" tabletWidth="85">
                            <Row noGap>
                                <Col width="100">
                                    <a href={"/ProfilSekolah/"+ option.sekolah_id}>
                                        <h2 style={{marginTop: '0px', marginBottom: '0px'}}>
                                            { option.nama}  
                                        </h2>
                                    </a>
                                </Col>
                                <Col width="100" tabletWidth="60" style={{marginBottom:'8px'}}>
                                    NIK: <b>{option.nik}</b> <br/>
                                    Jenis Kelamin: <b> { option.jenis_kelamin === 'L' ? 'Laki laki' : option.jenis_kelamin === 'P' ? 'Perempuan' : '' } </b> <br/>
                                    TTL: <b>{ option.tempat_lahir }, { option.tanggal_lahir }</b> <br/>
                                    Titik Koordinat: <b>{ option.lintang }, {option.bujur}</b> <br/>
                                    Sekolah Asal: <b>{ option.sekolah_asal.nama } ({option.sekolah_asal.npsn})</b> <br/>
                                </Col>
                                <Col width="100" tabletWidth="40">
                                  {localStorage.getItem('kode_aplikasi') === 'PPDB' &&
                                  <Button style={{marginBottom:'4px'}} disabled={(option.status_konfirmasi === 1 ? true : false)} onClick={()=>this.$f7router.navigate("/tambahCalonPesertaDidik/"+option.calon_peserta_didik_id)}>
                                      Edit Formulir
                                  </Button>
                                  }
                                  {localStorage.getItem('kode_aplikasi') !== 'PPDB' &&
                                  <Button style={{marginBottom:'4px'}} disabled={(option.status_konfirmasi === 0 ? true : false)} onClick={()=>this.batalkanKonfirmasi(option.calon_peserta_didik_id, option.nama)} iconIos="f7:shield_slash" iconSize="17" raised fill color="red">
                                      {this.state.disabledButton && <Preloader color="white"></Preloader>}&nbsp;Batalkan Konfirmasi
                                  </Button>
                                  }
                                  {/* {localStorage.getItem('kode_aplikasi') !== 'PPDB' &&
                                  <Button raised fill onClick={()=>this.simpanKonfirmasi("1", option.pengguna_id, option.calon_peserta_didik_id)} disabled={(option.status_konfirmasi === 1 ? false : true)}>
                                    {this.state.disableButton && <Preloader color="white"></Preloader>} Konfirmasi Pendaftar ini
                                  </Button>
                                  } */}
                                  <Button
                                      fillIos
                                      onClick={e => this.cetakFormulir(option) }
                                      disabled={(option.status_konfirmasi === 1 ? false : true)}
                                      iconIos="f7:printer_fill"
                                      iconSize="17"
                                      style={{marginBottom:'4px'}}
                                  >
                                      &nbsp;Cetak Formulir
                                  </Button>
                                  <Button
                                      fillIos
                                      onClick={e => this.cetakBukti(option) }
                                      disabled={(option.status_konfirmasi === 1 ? false : true)}
                                      iconIos="f7:printer_fill"
                                      iconSize="17"
                                      style={{marginBottom:'4px'}}
                                  >
                                      &nbsp;Cetak Bukti Pendaftaran
                                  </Button>
                                </Col>
                            </Row>
                        </Col>
                        <Col width={100} style={{border:'1px solid #ccceee', marginTop:'8px'}}>
                            <Row noGap>
                                {option.pilihan_sekolah.map((optionSekolah, key1)=>{
                                return (
                                    <Col width="33" tabletWidth="33" key={key1}>
                                        <Card style={{minHeight:'100px', margin:'8px', textAlign:'center', backgroundImage:'url(http://foto.data.kemdikbud.go.id/getImage/' + optionSekolah.npsn + '/1.jpg)', backgroundSize:'cover'}}>
                                            <CardContent style={{padding:'4px', background: 'rgba(0, 0, 0, 0.5)', minHeight:'100px'}}>
                                            <div style={{fontSize:'12px', color:'white', minHeight:'35px'}}><b>{optionSekolah.nama_sekolah}</b></div>
                                            <div style={{fontSize:'12px', color:'#FFF9C4', fontWeight:'bold'}}>Jalur {optionSekolah.jalur}</div>
                                            <div style={{fontSize:'12px', color:'white'}}>No.Urut Pendaftaran Sementara</div>
                                            <div style={{fontSize:'25px', fontWeight:'bold', color:'white'}}>{optionSekolah.urutan}/{optionSekolah.kuota}</div>
                                            </CardContent>
                                        </Card>
                                    </Col>
                                )
                                })}
                            </Row>
                        </Col>
                    </Row>
                </CardContent>
                <CardFooter className="no-border">
                {/* <CardFooter className="no-border" style={{display:'-webkit-inline-box', width:'100%'}}> */}
                    {/* {localStorage.getItem('kode_aplikasi') === 'PPDB' &&
                    <Button disabled={(option.status_konfirmasi === 1 ? true : false)} onClick={()=>this.$f7router.navigate("/tambahCalonPesertaDidik/"+option.calon_peserta_didik_id)}>
                        Edit Formulir
                    </Button>
                    }
                    {localStorage.getItem('kode_aplikasi') !== 'PPDB' &&
                    <Button disabled={(option.status_konfirmasi === 0 ? true : false)} onClick={()=>this.batalkanKonfirmasi(option.calon_peserta_didik_id, option.nama)} iconIos="f7:shield_slash" iconSize="17" raised fill color="red">
                        {this.state.disabledButton && <Preloader color="white"></Preloader>}&nbsp;Batalkan Konfirmasi
                    </Button>
                    } */}
                    {localStorage.getItem('kode_aplikasi') === 'PPDB' &&
                    <Button disabled={(option.status_konfirmasi === 1 ? true : false)} onClick={()=>this.$f7router.navigate("/tambahKonfirmasi/"+option.calon_peserta_didik_id)}>
                        Status: {(option.status_konfirmasi === 1 ? 'Terkonfirmasi' : 'Draft')}
                    </Button>
                    }
                    {localStorage.getItem('kode_aplikasi') !== 'PPDB' &&
                    <Button disabled={(option.status_konfirmasi === 1 ? true : false)}>
                        Status: {(option.status_konfirmasi === 1 ? 'Terkonfirmasi' : 'Draft')}
                    </Button>
                    }
                    <Button>
                        Tanggal Konfirmasi: {option.status_konfirmasi === 1 ? option.tanggal_konfirmasi : '-'}
                    </Button>
                    {/* <Button
                        fillIos
                        onClick={e => this.cetakFormulir(option) }
                        disabled={(option.status_konfirmasi === 1 ? false : true)}
                        iconIos="f7:printer_fill"
                        iconSize="17"
                    >
                        &nbsp;Cetak Formulir
                    </Button>
                    <Button
                        fillIos
                        onClick={e => this.cetakBukti(option) }
                        disabled={(option.status_konfirmasi === 1 ? false : true)}
                        iconIos="f7:printer_fill"
                        iconSize="17"
                    >
                        &nbsp;Cetak Bukti Pendaftaran
                    </Button> */}
                </CardFooter>
                {option.status_konfirmasi !== 1 &&
                <CardFooter className="no-border" style={{minHeight:'10px',fontSize:'10px',padding:'8px', fontStyle:'italic',paddingLeft:'16px'}}>
                    <span>*Formulir dan Bukti Pendaftaran belum dapat dicetak sebelum pendaftar melakukan konfirmasi</span>
                </CardFooter>
                }
            </Card>
          )
        })}
        </>
        }
        {localStorage.getItem('kode_aplikasi') !== 'PPDB' &&
        <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={this.state.limit}
            totalItemsCount={this.props.entities.countAll}
            pageRangeDisplayed={5}
            onChange={this.handlePageChange}
        />
        }
        {localStorage.getItem('kode_aplikasi') === 'PPDB' &&
        <>
        {this.props.entities.count > 1 &&
        <Block strong style={{marginTop:'8px', marginBottom:'0px'}}>
            <Button raised fill color="gray" onClick={this.muatSelanjutnya}>Muat data selanjutnya</Button>
        </Block>
        }
        </>
        }
        <div style={{height:'100px'}}>
          &nbsp;
        </div>
      </Page>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getCalonPD: Actions.getCalonPD,
    batalkanKonfirmasi : Actions.batalkanKonfirmasi,
    simpanKonfirmasiPendaftaran: Actions.simpanKonfirmasiPendaftaran
  }, dispatch);
}

function mapStateToProps({ App, DaftarPendaftaran }) {
  return {
    window_dimension: App.window_dimension,
    entities: DaftarPendaftaran.entities,
  }
}

export default (connect(mapStateToProps, mapDispatchToProps)(DaftarPendaftaran));
  
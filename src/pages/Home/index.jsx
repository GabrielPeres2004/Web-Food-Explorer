import { useLocation } from "react-router-dom"
import { Container } from "./style"

import { SideMenu } from "../../components/SideMenu"
import { Header } from "../../components/Header/Index"
import { CardDish } from "../../components/CardDish"
import { Input } from "../../components/Input"


import { useAuth } from "../../hooks/auth"

import Checkbox from '@mui/material/Checkbox'

import { useState, useEffect } from "react"

import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"

import { api } from "../../services/api"
import { USER_ROLES } from "../../utils/roles"

import { toast } from "react-toastify"

import { FiSearch } from "react-icons/fi"

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'


console
export function Home() {
    const { user, SignOut } = useAuth()

    const location = useLocation()

    const [menuIsOpen, setMenuIsOpen] = useState(false)
    const [selectedCategories, setSelectedCategories] = useState(["All"])


    const [dishes, setDishes] = useState([])
    const [favorites, setFavorites] = useState([])
    const [search, setSearch] = useState("")

    const handleCheckboxChange = (category) => {
        if (category === "All") {
            setSelectedCategories(["All"])
        } else {
            setSelectedCategories((prev) => {
                const updatedCategories = prev.includes(category) ? prev.filter((item) => item !== category)
                    : [...prev.filter((item) => item !== "All"), category]

                return updatedCategories.length === 0 ? ["All"] : updatedCategories
            })
        }
    }


    const filteredDishes = dishes.filter(dish => {
        if (user.role === USER_ROLES.ADMIN) return true
        return dish.active === 1
    })

    useEffect(() => {
        try {
            async function fetchDishes() {
                const response = await api
                    .get(`/dish?name=${search}`)
                    .catch((error) => {
                        if (error.response?.status === 401) {
                            SignOut()
                            return
                        }

                    })
                setDishes(response.data)
            }

            fetchDishes()

        } catch (error) {

            if (error.response?.status === 401) {
                SignOut()
            }

            if (error.response) {
                toast.error(error.response.data.message)
            }

        }

    }, [search])

    useEffect(() => {

        try {
            async function getDish() {
                const response = await api.get(`/dish`)
                setDishes(response.data)
            }

            async function getFavoriteDish() {
                const response = await api.get(`/favorite`)
                setFavorites(response.data)
            }

            if (location.pathname === "/") {
                getDish()
                getFavoriteDish()
            }

        } catch (error) {

            if (error.response?.status === 401) {
                SignOut()
            }

            if (error.response) {
                toast.error(error.response.data.message)
            }

        }


    }, [location])


    return (
        <Container>

            <SideMenu
                menuIsOpen={menuIsOpen}
                onCloseMenu={() => setMenuIsOpen(false)}
                onChange={(e) => setSearch(e.target.value)}
            />

            <Header
                onOpenMenu={() => setMenuIsOpen(true)}
                onChange={(e) => setSearch(e.target.value)}
            />

            <main>
                <header>

                    <Input
                        icon={FiSearch}
                        placeholder='Busque por pratos'
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <div className="imgDish">
                        <h3>Descubra uma experiência gastronômica única no Food Explorer !</h3>
                        <p>Aqui, cada prato é preparado com ingredientes selecionados e um toque especial de sabor e sofisticação. Explore novas combinações e se delicie com criações inesquecíveis!
                        </p>
                    </div>

                    <div className="options-Dish">
                        <label>
                            <Checkbox
                                className="customCheckbox"

                                checked={selectedCategories.includes("All")}
                                onChange={() => handleCheckboxChange("All")}
                                sx={{
                                    color: "checkbox.primary.main",
                                    '& .MuiSvgIcon-root': { fontSize: 24 },
                                    '&.Mui-checked': {
                                        color: "checkbox.primary.main",
                                    }
                                }}
                            />
                            <span>Todos</span>
                        </label>

                        <label>
                            <Checkbox
                                className="customCheckbox"
                                checked={selectedCategories.includes("Snack")}
                                onChange={() => handleCheckboxChange("Snack")}
                                sx={{
                                    color: "checkbox.primary.main",
                                    '& .MuiSvgIcon-root': { fontSize: 24 },
                                    '&.Mui-checked': {
                                        color: "checkbox.primary.main",
                                    }

                                }}
                            />
                            <span>Refeição</span>
                        </label>

                        <label>
                            <Checkbox
                                className="customCheckbox"
                                checked={selectedCategories.includes("Drinks")}
                                onChange={() => handleCheckboxChange("Drinks")}
                                sx={{
                                    color: "checkbox.primary.main",
                                    '& .MuiSvgIcon-root': { fontSize: 24 },
                                    '&.Mui-checked': {
                                        color: "checkbox.primary.main",
                                    }

                                }}
                            />
                            <span>Bebidas</span>
                        </label>

                        <label>
                            <Checkbox
                                className="customCheckbox"
                                checked={selectedCategories.includes("Desserts")}
                                onChange={() => handleCheckboxChange("Desserts")}
                                sx={{
                                    color: "checkbox.primary.main",
                                    '& .MuiSvgIcon-root': { fontSize: 24 },
                                    '&.Mui-checked': {
                                        color: "checkbox.primary.main",
                                    }

                                }}
                            />
                            <span>Sobremesa</span>
                        </label>
                    </div>

                </header>



                {(selectedCategories.includes("All") || selectedCategories.includes("Snack")) && (
                    dishes.some(dish => dish.category === "Refeição") && (
                        < div className="Snack">
                            <h2>Refeição</h2>

                            <Swiper
                                modules={[Navigation, Pagination, Autoplay]}
                                slidesPerView={1}
                                spaceBetween={19}
                                pagination={{
                                    clickable: true,
                                }}
                                breakpoints={{
                                    640: { slidesPerView: 2, spaceBetween: 20 },
                                    1024: { slidesPerView: 3, spaceBetween: 30 },
                                    1440: { slidesPerView: 3, spaceBetween: 30 },
                                }}
                                autoplay={{
                                    delay: 3000,
                                    disableOnInteraction: true,
                                }}

                                className="mySwiper"
                            >
                                {
                                    filteredDishes &&
                                    filteredDishes
                                        .filter((item) => item.category === "Refeição")
                                        .map((item) => (

                                            <SwiperSlide key={String(item.id)} className="mySwiperSlide">
                                                <CardDish
                                                    data={item}
                                                    isFavorite={favorites.some(fav => fav.dish_id === item.id)}
                                                />
                                            </SwiperSlide>
                                        ))
                                }


                            </Swiper>
                        </div>
                    )
                )}

                {(selectedCategories.includes("All") || selectedCategories.includes("Drinks")) && (
                    dishes.some(dish => dish.category === "Bebidas") && (
                        <div className="Drinks">
                            <h2>Bebidas</h2>

                            <Swiper
                                modules={[Navigation, Pagination, Autoplay]}
                                slidesPerView={1}
                                spaceBetween={10}
                                navigation
                                pagination={{
                                    clickable: true,
                                }}
                                breakpoints={{
                                    640: { slidesPerView: 2, spaceBetween: 20 },
                                    1024: { slidesPerView: 3, spaceBetween: 30 },
                                    1440: { slidesPerView: 3, spaceBetween: 0 },
                                }}
                                autoplay={{
                                    delay: 3000,
                                    disableOnInteraction: true,
                                }}

                                className="mySwiper"
                            >

                                {
                                    filteredDishes &&
                                    filteredDishes
                                        .filter((item) => item.category === "Bebidas")
                                        .map((item) => (

                                            <SwiperSlide key={String(item.id)} className="mySwiperSlide">
                                                <CardDish
                                                    data={item}
                                                    isFavorite={favorites.some(fav => fav.dish_id === item.id)}
                                                />
                                            </SwiperSlide>
                                        ))
                                }

                            </Swiper>
                        </div>
                    )
                )}


                {(selectedCategories.includes("All") || selectedCategories.includes("Desserts")) && (
                    dishes.some(dish => dish.category === "Sobremesa") && (
                        <div className="Desserts">
                            <h2>Sobremesa</h2>

                            <Swiper
                                modules={[Navigation, Pagination, Autoplay]}
                                slidesPerView={1}
                                spaceBetween={10}
                                navigation
                                pagination={{
                                    clickable: true,
                                }}
                                breakpoints={{
                                    640: { slidesPerView: 2, spaceBetween: 20 },
                                    1024: { slidesPerView: 3, spaceBetween: 30 },
                                    1440: { slidesPerView: 3, spaceBetween: 0 },
                                }}
                                autoplay={{
                                    delay: 3000,
                                    disableOnInteraction: true,
                                }}

                                className="mySwiper"
                            >

                                {
                                    filteredDishes &&
                                    filteredDishes
                                        .filter((item) => item.category === "Sobremesa")
                                        .map((item) => (

                                            <SwiperSlide key={String(item.id)} className="mySwiperSlide">
                                                <CardDish
                                                    data={item}
                                                    isFavorite={favorites.some(fav => fav.dish_id === item.id)}
                                                />
                                            </SwiperSlide>
                                        ))
                                }

                            </Swiper>
                        </div>
                    )
                )}

            </main>

        </Container >
    )
}
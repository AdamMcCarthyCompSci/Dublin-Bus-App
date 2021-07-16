# Generated by Django 3.2.4 on 2021-07-16 12:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bus', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='AuthGroup',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150, unique=True)),
            ],
            options={
                'db_table': 'auth_group',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='AuthGroupPermissions',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
            ],
            options={
                'db_table': 'auth_group_permissions',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='AuthPermission',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('codename', models.CharField(max_length=100)),
            ],
            options={
                'db_table': 'auth_permission',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='AuthUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128)),
                ('last_login', models.DateTimeField(blank=True, null=True)),
                ('is_superuser', models.IntegerField()),
                ('username', models.CharField(max_length=150, unique=True)),
                ('first_name', models.CharField(max_length=150)),
                ('last_name', models.CharField(max_length=150)),
                ('email', models.CharField(max_length=254)),
                ('is_staff', models.IntegerField()),
                ('is_active', models.IntegerField()),
                ('date_joined', models.DateTimeField()),
            ],
            options={
                'db_table': 'auth_user',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='AuthUserGroups',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
            ],
            options={
                'db_table': 'auth_user_groups',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='AuthUserUserPermissions',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
            ],
            options={
                'db_table': 'auth_user_user_permissions',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='BusResults',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=20)),
                ('directions', models.CharField(max_length=200)),
                ('prediction', models.CharField(max_length=200)),
            ],
            options={
                'db_table': 'bus_results',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='CurrentTraffic',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('confidence', models.IntegerField()),
                ('current_speed', models.IntegerField()),
                ('current_travel_time', models.IntegerField()),
                ('frc', models.CharField(blank=True, max_length=25, null=True)),
                ('free_flow_speed', models.IntegerField()),
                ('free_flow_travel_time', models.IntegerField()),
                ('road_closure', models.IntegerField(blank=True, null=True)),
                ('timestamp', models.DateTimeField()),
            ],
            options={
                'db_table': 'current_traffic',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='CurrentWeather',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateTimeField(blank=True, null=True)),
                ('temp', models.CharField(blank=True, max_length=5, null=True)),
                ('feels_like', models.FloatField(blank=True, null=True)),
                ('wind_speed', models.FloatField(blank=True, null=True)),
                ('clouds_all', models.IntegerField(blank=True, null=True)),
                ('weather_id', models.IntegerField(blank=True, null=True)),
                ('weather_main', models.CharField(blank=True, max_length=20, null=True)),
                ('weather_description', models.CharField(blank=True, max_length=45, null=True)),
                ('sunrise', models.DateTimeField(blank=True, null=True)),
                ('sunset', models.DateTimeField(blank=True, null=True)),
                ('icon', models.CharField(blank=True, max_length=10, null=True)),
            ],
            options={
                'db_table': 'current_weather',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='DjangoAdminLog',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('action_time', models.DateTimeField()),
                ('object_id', models.TextField(blank=True, null=True)),
                ('object_repr', models.CharField(max_length=200)),
                ('action_flag', models.PositiveSmallIntegerField()),
                ('change_message', models.TextField()),
            ],
            options={
                'db_table': 'django_admin_log',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='DjangoContentType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('app_label', models.CharField(max_length=100)),
                ('model', models.CharField(max_length=100)),
            ],
            options={
                'db_table': 'django_content_type',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='DjangoMigrations',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('app', models.CharField(max_length=255)),
                ('name', models.CharField(max_length=255)),
                ('applied', models.DateTimeField()),
            ],
            options={
                'db_table': 'django_migrations',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='DjangoSession',
            fields=[
                ('session_key', models.CharField(max_length=40, primary_key=True, serialize=False)),
                ('session_data', models.TextField()),
                ('expire_date', models.DateTimeField()),
            ],
            options={
                'db_table': 'django_session',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='DublinBusRoutes',
            fields=[
                ('dublin_bus_routes_id', models.AutoField(primary_key=True, serialize=False)),
                ('stopsequence', models.IntegerField(db_column='StopSequence')),
                ('routename', models.CharField(blank=True, db_column='RouteName', max_length=5, null=True)),
                ('routedescription', models.CharField(blank=True, db_column='RouteDescription', max_length=45, null=True)),
                ('direction', models.CharField(blank=True, db_column='Direction', max_length=5, null=True)),
                ('atcocode', models.CharField(blank=True, db_column='AtcoCode', max_length=12, null=True)),
                ('platecode', models.IntegerField(db_column='PlateCode')),
                ('shortcommonname_en', models.CharField(blank=True, db_column='ShortCommonName_en', max_length=25, null=True)),
            ],
            options={
                'db_table': 'dublin_bus_routes',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='TfiAgency',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('agency_id', models.IntegerField(blank=True, null=True)),
                ('agency_name', models.CharField(blank=True, max_length=45, null=True)),
                ('agency_url', models.CharField(blank=True, max_length=45, null=True)),
                ('agency_timezone', models.CharField(blank=True, max_length=45, null=True)),
                ('agency_lang', models.CharField(blank=True, max_length=45, null=True)),
            ],
            options={
                'db_table': 'tfi_agency',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='TfiCalendar',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('service_id', models.CharField(blank=True, max_length=45, null=True)),
                ('monday', models.IntegerField(blank=True, null=True)),
                ('tuesday', models.IntegerField(blank=True, null=True)),
                ('wednesday', models.IntegerField(blank=True, null=True)),
                ('thursday', models.IntegerField(blank=True, null=True)),
                ('friday', models.IntegerField(blank=True, null=True)),
                ('saturday', models.IntegerField(blank=True, null=True)),
                ('sunday', models.IntegerField(blank=True, null=True)),
                ('start_date', models.IntegerField(blank=True, null=True)),
                ('end_date', models.IntegerField(blank=True, null=True)),
            ],
            options={
                'db_table': 'tfi_calendar',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='TfiCalendarDates',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('service_id', models.CharField(blank=True, max_length=45, null=True)),
                ('date', models.IntegerField(blank=True, null=True)),
                ('exception_type', models.IntegerField(blank=True, null=True)),
            ],
            options={
                'db_table': 'tfi_calendar_dates',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='TfiRealtime',
            fields=[
                ('id', models.BigIntegerField(blank=True, primary_key=True, serialize=False)),
                ('timestamp', models.TextField(blank=True, null=True)),
                ('start_time', models.TextField(blank=True, null=True)),
                ('start_date', models.TextField(blank=True, null=True)),
                ('trip_id', models.TextField(blank=True, null=True)),
                ('route_id', models.TextField(blank=True, null=True)),
                ('schedule_relationship', models.TextField(blank=True, null=True)),
                ('stop_id', models.TextField(blank=True, null=True)),
                ('stop_sequence', models.BigIntegerField(blank=True, null=True)),
                ('arrival_delay', models.FloatField(blank=True, null=True)),
                ('arrival_time', models.FloatField(blank=True, null=True)),
                ('departure_delay', models.FloatField(blank=True, null=True)),
                ('departure_time', models.FloatField(blank=True, null=True)),
            ],
            options={
                'db_table': 'tfi_realtime',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='TfiRoutes',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('route_id', models.CharField(blank=True, max_length=45, null=True)),
                ('agency_id', models.IntegerField(blank=True, null=True)),
                ('route_short_name', models.CharField(blank=True, max_length=45, null=True)),
                ('route_long_name', models.CharField(blank=True, max_length=250, null=True)),
                ('route_type', models.IntegerField(blank=True, null=True)),
            ],
            options={
                'db_table': 'tfi_routes',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='TfiRouteStops',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('stop_number', models.IntegerField()),
            ],
            options={
                'db_table': 'tfi_route_stops',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='TfiShapes',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('shape_id', models.CharField(blank=True, max_length=45, null=True)),
                ('shape_pt_lat', models.FloatField(blank=True, null=True)),
                ('shape_pt_lon', models.FloatField(blank=True, null=True)),
                ('shape_pt_sequence', models.IntegerField(blank=True, null=True)),
                ('shape_dist_traveled', models.IntegerField(blank=True, null=True)),
            ],
            options={
                'db_table': 'tfi_shapes',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='TfiStationDistance',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('pk_id', models.BigIntegerField(blank=True, null=True)),
                ('lineid', models.TextField(blank=True, db_column='LINEID', null=True)),
                ('routeid', models.TextField(blank=True, db_column='ROUTEID', null=True)),
                ('direction', models.BigIntegerField(blank=True, db_column='DIRECTION', null=True)),
                ('progrnumber', models.BigIntegerField(blank=True, db_column='PROGRNUMBER', null=True)),
                ('stopid', models.TextField(blank=True, db_column='STOPID', null=True)),
                ('prev_stopid', models.TextField(blank=True, db_column='PREV_STOPID', null=True)),
                ('distance_travelled', models.FloatField(blank=True, db_column='DISTANCE_TRAVELLED', null=True)),
                ('dist_between', models.FloatField(blank=True, db_column='DIST_BETWEEN', null=True)),
            ],
            options={
                'db_table': 'tfi_station_distance',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='TfiStops',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('stop_id', models.CharField(max_length=45)),
                ('stop_name', models.CharField(blank=True, max_length=250, null=True)),
                ('stop_lat', models.FloatField(blank=True, null=True)),
                ('stop_lon', models.FloatField(blank=True, null=True)),
            ],
            options={
                'db_table': 'tfi_stops',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='TfiStopsPerRoute',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('pk_id', models.BigIntegerField(blank=True, null=True)),
                ('lineid', models.TextField(blank=True, db_column='LINEID', null=True)),
                ('routeid', models.TextField(blank=True, db_column='ROUTEID', null=True)),
                ('direction', models.BigIntegerField(blank=True, db_column='DIRECTION', null=True)),
                ('total_stops', models.BigIntegerField(blank=True, db_column='TOTAL_STOPS', null=True)),
            ],
            options={
                'db_table': 'tfi_stops_per_route',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='TfiStopTimes',
            fields=[
                ('id', models.BigIntegerField(blank=True, primary_key=True, serialize=False)),
                ('trip_id', models.TextField(blank=True, null=True)),
                ('arrival_time', models.TextField(blank=True, null=True)),
                ('departure_time', models.TextField(blank=True, null=True)),
                ('stop_id', models.TextField(blank=True, null=True)),
                ('stop_sequence', models.BigIntegerField(blank=True, null=True)),
                ('stop_headsign', models.TextField(blank=True, null=True)),
                ('pickup_type', models.BigIntegerField(blank=True, null=True)),
                ('drop_off_type', models.BigIntegerField(blank=True, null=True)),
                ('shape_dist_traveled', models.FloatField(blank=True, null=True)),
            ],
            options={
                'db_table': 'tfi_stop_times',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='TfiTimetableHistoric',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('pk_id', models.BigIntegerField(blank=True, null=True)),
                ('lineid', models.TextField(blank=True, db_column='LINEID', null=True)),
                ('routeid', models.TextField(blank=True, db_column='ROUTEID', null=True)),
                ('direction', models.BigIntegerField(blank=True, db_column='DIRECTION', null=True)),
                ('progrnumber', models.BigIntegerField(blank=True, db_column='PROGRNUMBER', null=True)),
                ('stoppointid', models.BigIntegerField(blank=True, db_column='STOPPOINTID', null=True)),
                ('plannedtime_dep', models.TextField(blank=True, db_column='PLANNEDTIME_DEP', null=True)),
                ('weekday', models.TextField(blank=True, db_column='WEEKDAY', null=True)),
            ],
            options={
                'db_table': 'tfi_timetable_historic',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='TfiTrips',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('route_id', models.CharField(blank=True, max_length=45, null=True)),
                ('service_id', models.CharField(blank=True, max_length=45, null=True)),
                ('trip_id', models.CharField(max_length=45)),
                ('shape_id', models.CharField(blank=True, max_length=45, null=True)),
                ('trip_headsign', models.CharField(blank=True, max_length=250, null=True)),
                ('direction_id', models.IntegerField(blank=True, null=True)),
            ],
            options={
                'db_table': 'tfi_trips',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='TrafficIncidents',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
            options={
                'db_table': 'traffic_incidents',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Weather4DayHourlyForecast',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateTimeField(blank=True, null=True, unique=True)),
                ('temp', models.FloatField(blank=True, null=True)),
                ('feels_like', models.FloatField(blank=True, null=True)),
                ('wind_speed', models.FloatField(blank=True, null=True)),
                ('clouds_all', models.BigIntegerField(blank=True, null=True)),
                ('weather_id', models.BigIntegerField(blank=True, null=True)),
                ('description', models.TextField(blank=True, null=True)),
                ('main_description', models.TextField(blank=True, null=True)),
                ('icon', models.TextField(blank=True, null=True)),
                ('sunrise', models.DateTimeField(blank=True, null=True)),
                ('sunset', models.DateTimeField(blank=True, null=True)),
            ],
            options={
                'db_table': 'weather_4_day_hourly_forecast',
                'managed': False,
            },
        ),
        migrations.DeleteModel(
            name='Results',
        ),
    ]
